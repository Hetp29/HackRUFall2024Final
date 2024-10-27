# analytics/urls.py
from django.urls import path
from .views import (
    AdvancedSentimentAnalysisView,
    ChurnPredictionView,
    CustomerSegmentationView,
    LifetimeValuePredictionView,
    PersonalizedRecommendationView,
    RFMAnalysisView,
    SentimentAnalysisView,
    ProductRecommendationView,
    AddCustomerView
)

urlpatterns = [
    path('customer-segmentation/', CustomerSegmentationView.as_view(), name='customer_segmentation'),
    path('ltv-prediction/<int:customer_id>/', LifetimeValuePredictionView.as_view(), name='ltv_prediction'),
    path('sentiment-analysis/', SentimentAnalysisView.as_view(), name='sentiment_analysis'),
    path('recommendations/<int:customer_id>/', ProductRecommendationView.as_view(), name='recommendation_engine'),
    path('rfm-analysis/', RFMAnalysisView.as_view(), name='rfm_analysis'),
    path('churn-prediction/', ChurnPredictionView.as_view(), name='churn_prediction'),
    path('personalized-recommendations/<int:customer_id>/', PersonalizedRecommendationView.as_view(), name='personalized_recommendations'),
    path('advanced-sentiment-analysis/', AdvancedSentimentAnalysisView.as_view(), name='advanced_sentiment_analysis'),
    path('add-customer/', AddCustomerView.as_view(), name='add_customer'),
    path('ltv-prediction/', LifetimeValuePredictionView.as_view(), name='ltv_prediction'),
    path('recommendations/', ProductRecommendationView.as_view(), name='recommendation_engine'),  # Correct path for POST requests without customer_id
]
