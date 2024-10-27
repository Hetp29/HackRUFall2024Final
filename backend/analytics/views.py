from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler, MinMaxScaler, PolynomialFeatures
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor, GradientBoostingRegressor, VotingClassifier, GradientBoostingClassifier
from .models import Customer, Transaction, Product
from textblob import TextBlob
from sklearn.model_selection import train_test_split
import numpy as np
import pandas as pd
import random
from datetime import datetime
from statsmodels.tsa.holtwinters import ExponentialSmoothing
from sklearn.neighbors import NearestNeighbors
from transformers import pipeline
import logging
from django.db import IntegrityError
from django.shortcuts import get_object_or_404
from rest_framework import serializers
from datetime import datetime, timedelta
import torch
from django.conf import settings
from collections import defaultdict
from concurrent.futures import ThreadPoolExecutor, TimeoutError

device = 0 if torch.cuda.is_available() else -1
logger = logging.getLogger(__name__)
sentiment_analyzer = None
SENTIMENT_TIMEOUT = 5


scaler = MinMaxScaler()
poly = PolynomialFeatures(degree=2, include_bias=False)

# Expanded mock data for initial model training
mock_data = np.array([
    [10, 8, 300, 24, 35],
    [60, 5, 100, 12, 45],
    [120, 3, 50, 6, 28],
    [200, 1, 20, 3, 60],
    [5, 10, 500, 36, 25],
    [45, 6, 120, 18, 38],
    [15, 7, 200, 24, 30],
    [90, 4, 80, 14, 50],
    [150, 2, 40, 8, 55],
    [5, 9, 600, 40, 29],
    [80, 4, 300, 10, 42],
    [120, 6, 150, 15, 37],
    [10, 10, 700, 50, 23],
    [100, 3, 60, 5, 52],
    [200, 2, 30, 2, 67]
])
mock_labels = [0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1]

# Scale and transform the mock data once
mock_data_poly = poly.fit_transform(mock_data)
scaled_mock_data = scaler.fit_transform(mock_data_poly)

# Initialize and train the ensemble model
rf = RandomForestClassifier(n_estimators=100, max_depth=7, random_state=42)
gb = GradientBoostingClassifier(n_estimators=100, learning_rate=0.1, random_state=42)
ensemble_model = VotingClassifier(
    estimators=[('rf', rf), ('gb', gb)],
    voting='soft'
)
ensemble_model.fit(scaled_mock_data, mock_labels)

class CustomerSegmentationView(APIView):
    def get(self, request):
        try:
            n_clusters = int(request.query_params.get('n_clusters', 5))
            age_min = int(request.query_params.get('age_min', 18))
            age_max = int(request.query_params.get('age_max', 100))
            location = request.query_params.get('location', '') or None
            spending_level = float(request.query_params.get('spending_level', 500))

            # Filter customers based on provided criteria
            customers = Customer.objects.filter(
                age__gte=age_min,
                age__lte=age_max,
                total_spent__gte=spending_level
            )
            if location:
                customers = customers.filter(location=location)

            customer_count = customers.count()
            if customer_count == 0:
                return Response({'error': 'No customers available for segmentation'}, status=status.HTTP_400_BAD_REQUEST)
            
            if customer_count < 2:
                return Response({'error': 'Not enough customers to perform clustering.'}, status=status.HTTP_400_BAD_REQUEST)

            # Adjust n_clusters if it exceeds customer count
            if n_clusters > customer_count:
                n_clusters = customer_count
            
            if location and location.strip():
                customers = customers.filter(location=location.strip())


            # Perform KMeans clustering
            data = np.array([[c.age, c.total_spent] for c in customers])
            kmeans = KMeans(n_clusters=n_clusters).fit(data)
            labels = kmeans.labels_

            return Response({'segments': labels.tolist()}, status=status.HTTP_200_OK)

        except ValueError as e:
            return Response({'error': f'Invalid input: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
        
        #businesses can understand demographics and spending patterns of customer base. if segment 2 (high spending middle aged customers is largets, business might prioritze marketing efforts toward them)
        
        #View receives parameters from frontend (number of clusters, age, location and spending level)
        #filters the customer records based on criteria in request, if no customer matches, error message is returned
        #if number of clusters requested is more than number of customers, it educes number of cluters to avoid errors
        #it extracts relevant data (age and total spent) from filtered customers
        #data is used as input for clustering
        #view runs KMeans with specified number of clusters on the data (age and total spent)
        #customer is assigned cluster label based on segment 
        #returns segment labels as list
        #segment represents a group of customers with similar age and spending levels as determined by KMeans clustering
        #K-means clustering is unsupervised machine learning algorithm that groups data points into clusters based on similarity 

class AddCustomerView(APIView):
    def post(self, request):
        try:
            name = request.data.get('name')
            email = request.data.get('email')
            age = request.data.get('age')
            gender = request.data.get('gender')
            location = request.data.get('location')
            total_spent = request.data.get('total_spent')

            if not all([name, email, age, gender, location, total_spent]):
                return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)

            # Attempt to create a new Customer
            customer = Customer.objects.create(
                name=name,
                email=email,
                age=age,
                gender=gender,
                location=location,
                total_spent=total_spent
            )
            logger.info(f"Customer '{customer.name}' added successfully.")
            return Response({'message': 'Customer added successfully'}, status=status.HTTP_201_CREATED)

        except IntegrityError as e:
            # Handle the unique constraint violation for email
            if 'unique constraint' in str(e):
                return Response({'error': 'A customer with this email already exists.'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                logger.error(f"IntegrityError: {e}")
                return Response({'error': 'Database integrity error.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            logger.error(f"Error adding customer: {e}")
            return Response({'error': 'Failed to add customer'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class LifetimeValuePredictionView(APIView):
    def post(self, request):
        # Collect customer data
        age = request.data.get('age')
        total_spent = request.data.get('total_spent')
        frequency = request.data.get('frequency')
        avg_purchase_value = request.data.get('avg_purchase_value')
        last_purchase_date = request.data.get('last_purchase_date')
        
        # Validate data
        if None in [age, total_spent, frequency, avg_purchase_value, last_purchase_date]:
            return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Calculate recency in days
            last_purchase_date = pd.to_datetime(last_purchase_date)
            recency = (datetime.now() - last_purchase_date).days
            
            # Add new feature interactions
            interaction_feature = frequency * avg_purchase_value
            X_input = np.array([[age, total_spent, frequency, avg_purchase_value, recency, interaction_feature]])

            # Expanded synthetic data to cover larger ranges of customer profiles
            synthetic_data = np.array([
                [10, 10, 5, 20, 365, 100],
                [15, 100, 10, 50, 300, 500],
                [20, 500, 20, 100, 250, 2000],
                [30, 2000, 50, 200, 200, 10000],
                [40, 10000, 100, 500, 150, 50000],
                [50, 50000, 200, 1000, 100, 200000],
                [60, 250000, 500, 2000, 50, 1000000],
                [70, 1000000, 750, 5000, 25, 3750000],
                [80, 2000000, 1000, 10000, 10, 5000000],
                [99, 5000000, 1000, 5000000, 5, 5000000],
                [45, 100000, 400, 2500, 75, 1000000],
                [55, 500000, 700, 300000, 40, 21000000],
                [35, 1500000, 600, 10000, 90, 6000000],
                [25, 750000, 300, 15000, 120, 4500000],
                [65, 2500000, 800, 500000, 20, 40000000],
            ])
            synthetic_targets = [
                500, 2000, 5000, 20000, 50000, 100000, 500000, 1500000, 3000000, 5000000,
                150000, 700000, 2000000, 1000000, 2500000
            ]

            # Scale data to standardize feature ranges
            scaler = StandardScaler()
            scaled_synthetic_data = scaler.fit_transform(synthetic_data)
            X_input_scaled = scaler.transform(X_input)

            # Use an ensemble of GradientBoosting and RandomForest for improved accuracy
            rf_model = RandomForestRegressor(n_estimators=200, random_state=42, min_samples_split=4)
            rf_model.fit(scaled_synthetic_data, synthetic_targets)
            
            gb_model = GradientBoostingRegressor(n_estimators=100, learning_rate=0.1, max_depth=4, random_state=42)
            gb_model.fit(scaled_synthetic_data, synthetic_targets)

            # Blend predictions for final result
            rf_prediction = rf_model.predict(X_input_scaled)[0]
            gb_prediction = gb_model.predict(X_input_scaled)[0]
            final_prediction = (rf_prediction * 0.5 + gb_prediction * 0.5)  #50/50 blend between randomforestregressor model and gradientboostingregressor model so both models can contribute equally, ensuring stability

            return Response({
                'predicted_lifetime_value': round(final_prediction, 2)
            }, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"Prediction failed: {e}")
            return Response({'error': f'Prediction failed: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)   
        #gather customer details like age, spending, recency of last purchase
        #add calculated features, such as recency measure (days since last purchase) and an interaction term (frequency multiplied by average purchase value), which enhance prediction accuracy (features engineering)
        #use set of data representing range of customer profiles so model can generalize across customer types
        #scales features and uses to ensemble models-RandomForest and GradientBoosting-for prediction stability and accuracy
        #combines predictions from both models (both contribute equally with 50/50 blend), ensuring a balanced and reliable lifetime value prediction for each customer
        



# Example assuming a ForeignKey named 'category' from Product to Category model
class ProductRecommendationView(APIView):
    def post(self, request):
        # Extract data from the request
        category_name = request.data.get('category')
        budget = request.data.get('budget')
        frequency = request.data.get('frequency')

        # Check for required fields
        if not all([category_name, budget, frequency]):
            return Response({'error': 'All fields (category, budget, frequency) are required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Print received parameters for debugging
            print("Category from request:", category_name)
            print("Budget from request:", budget)
            print("Frequency from request:", frequency)

            # Check all unique categories in the database for comparison
            print("Categories in database:", Product.objects.values_list('category', flat=True).distinct())

            # Filter products by category
            products = Product.objects.filter(category=category_name)
            print("Products matching category:", [product.name for product in products])  # Debugging output

            # Filter products based on budget and frequency criteria
            recommended_products = []
            for product in products:
                # Print each product's details during filtering
                print(f"Checking product: {product.name}, Price: {product.price}, Frequency: {product.purchase_frequency}")
                
                if product.price <= float(budget) and product.purchase_frequency >= int(frequency):
                    recommended_products.append(product.name)

            # If fewer than 5 recommended products, add more to reach 5
            if len(recommended_products) < 5:
                additional_products = products.exclude(name__in=recommended_products).values_list('name', flat=True)
                recommended_products.extend(additional_products[:5 - len(recommended_products)])

            # Debugging output for backend console
            print("Recommended Products:", recommended_products)

            # Respond with recommended products
            return Response({'recommended_products': recommended_products[:5]}, status=status.HTTP_200_OK)

        except Product.DoesNotExist:
            # If category filtering finds no products
            return Response({'error': 'No products found for the given category'}, status=status.HTTP_404_NOT_FOUND)

        except ValueError:
            # Handle invalid budget or frequency inputs
            return Response({'error': 'Invalid input for budget or frequency. Please enter valid numbers.'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            # Catch any other exceptions
            print(f"Error in ProductRecommendationView: {e}")
            return Response({'error': 'An error occurred while fetching recommendations.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class RFMAnalysisView(APIView):
    def post(self, request):
        transactions_data = request.data.get('transactions', [])

        if not transactions_data:
            return Response({'error': 'Transaction data is required for RFM analysis.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Step 1: Process transaction data
            transactions = []
            for trans in transactions_data:
                date = datetime.strptime(trans['date'], '%Y-%m-%d')
                amount = float(trans['amount'])
                transactions.append({'date': date, 'amount': amount})

            # Step 2: Calculate RFM scores
            # Recency: Days since last transaction
            last_transaction = max(trans['date'] for trans in transactions)
            recency = (datetime.now() - last_transaction).days

            # Frequency: Count of transactions
            frequency = len(transactions)

            # Monetary: Sum of all transaction amounts
            monetary = sum(trans['amount'] for trans in transactions)

            # Define scoring (example logic for illustration)
            recency_score = 5 if recency < 30 else 3 if recency < 90 else 1
            frequency_score = 5 if frequency >= 10 else 3 if frequency >= 5 else 1
            monetary_score = 5 if monetary >= 500 else 3 if monetary >= 100 else 1

            # Create RFM score
            rfm_score = {
                'recency': recency_score,
                'frequency': frequency_score,
                'monetary': monetary_score,
            }

            # Respond with RFM score
            return Response({'rfm_score': rfm_score}, status=status.HTTP_200_OK)

        except Exception as e:
            print(f"Error in RFMAnalysisView: {e}")
            return Response({'error': 'An error occurred while calculating RFM scores.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        #process transactions first (extract transaction dates and amounts to prepare for RFM calculations)
        #calculate scores (days since last transaction, with higher score for more recent activity)
        #frequency is total count of transactions, with higher score for frequent purchases
        #monetary is total spend amount
        #assign each score (recency, frequency, monteary) based on thresolds giving overall value score
        #RFM is to identify valuable customers by scoring them based on how recently, frequently, and how much they spend

class ChurnPredictionView(APIView):
    def post(self, request):
        last_interaction = request.data.get('last_interaction')
        engagement_frequency = request.data.get('engagement_frequency')
        total_spend = request.data.get('total_spend')
        tenure = request.data.get('tenure')
        age = request.data.get('age')

        if not all([last_interaction, engagement_frequency, total_spend, tenure, age]):
            return Response(
                {'error': 'All fields (last_interaction, engagement_frequency, total_spend, tenure, age) are required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            last_interaction_date = datetime.strptime(last_interaction, '%Y-%m-%d')
            recency_days = (datetime.now() - last_interaction_date).days
            engagement_frequency = int(engagement_frequency)
            total_spend = float(total_spend)
            tenure = int(tenure)
            age = int(age)

            # Create and scale the feature vector for the new input
            features = np.array([[recency_days, engagement_frequency, total_spend, tenure, age]])
            poly_features = poly.transform(features)  # Only transform, don't fit
            scaled_features = scaler.transform(poly_features)  # Only transform, don't fit

            # Predict churn probability using the pre-trained model
            churn_probability = ensemble_model.predict_proba(scaled_features)[0][1]
            return Response({'churn_probability': round(churn_probability * 100, 2)}, status=status.HTTP_200_OK)

        except ValueError:
            return Response({'error': 'Invalid input data. Please check your inputs.'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(f"Error in ChurnPredictionView: {e}")
            return Response({'error': 'An error occurred while predicting churn probability.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class PersonalizedRecommendationView(APIView):
    def get(self, request, customer_id):
        products = Product.objects.all()
        if not products.exists():
            return Response({'error': 'No products available for recommendations'}, status=status.HTTP_400_BAD_REQUEST)
        
        data = np.zeros((Customer.objects.count(), products.count()))
        for i, customer in enumerate(Customer.objects.all()):
            for j, product in enumerate(products):
                data[i, j] = Transaction.objects.filter(customer=customer, product=product).count()
        
        model = NearestNeighbors(n_neighbors=5, algorithm='auto').fit(data)
        distances, indices = model.kneighbors([data[customer_id]])
        
        recommended_products = [products[idx].name for idx in indices[0]]
        
        return Response({'recommended_products': recommended_products}, status=status.HTTP_200_OK)

class AdvancedSentimentAnalysisView(APIView):
    def post(self, request):
        feedback_text = request.data.get('feedback')
        if not feedback_text:
            return Response({'error': 'No feedback provided'}, status=status.HTTP_400_BAD_REQUEST)

        # Clean and preprocess feedback text
        feedback_text = feedback_text.strip().lower()

        try:
            # Run sentiment analysis using transformers
            transformer_result = sentiment_analyzer(feedback_text)[0]
            label = transformer_result['label']
            score = transformer_result['score']

            # Additional analysis with TextBlob
            blob = TextBlob(feedback_text)
            polarity = blob.sentiment.polarity
            subjectivity = blob.sentiment.subjectivity

            # Response customization based on sentiment strength
            response_message = "Highly Positive" if label == "POSITIVE" and score > 0.9 else label

            return Response({
                'label': label,
                'score': score,
                'polarity': polarity,
                'subjectivity': subjectivity,
                'message': response_message
            }, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"Sentiment analysis failed: {e}")
            return Response({'error': f'Sentiment analysis failed: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class SentimentAnalysisView(APIView):
    def post(self, request):
        # Get the text input from the request
        input_text = request.data.get('text', '')
        
        # Ensure input is provided
        if not input_text:
            return Response({'error': 'No text provided for analysis'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Analyze sentiment using TextBlob
            blob = TextBlob(input_text)
            polarity = blob.sentiment.polarity  # Ranges from -1 to 1
            
            # Determine sentiment label based on polarity score
            if polarity > 0:
                sentiment_label = 'POSITIVE'
            elif polarity < 0:
                sentiment_label = 'NEGATIVE'
            else:
                sentiment_label = 'NEUTRAL'
            
            # Return the sentiment label and polarity score
            return Response({
                'label': sentiment_label,
                'score': round(polarity * 100, 2)  # Convert to percentage for consistency
            }, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'error': f'Failed to analyze sentiment: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        #accepts text input and checks if input is provided
        #analyzes sentiment using TextBlob (range -1 to 1)
        #labels sentiment as positive, negative or neutral based on polarity
        #returns sentiment label and polarity score as a percentage