from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model, authenticate, login
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
import logging
import json

@csrf_exempt
def register(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            name = data.get('name')
            job_title = data.get('job_title')
            phone = data.get('phone')
            employees = data.get('employees')
            company_name = data.get('company_name')
            password = data.get('password')

            if not all([email, name, job_title, phone, employees, company_name, password]):
                return JsonResponse({'error': 'All fields are required'}, status=400)

            User = get_user_model()
            user = User.objects.create_user(
                email=email,
                name=name,
                job_title=job_title,
                phone=phone,
                employees=employees,
                company_name=company_name,
                password=password
            )
            return JsonResponse({'message': 'User created successfully'}, status=201)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'error': 'Only POST method is allowed'}, status=405)

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')
            
            if not all([email, password]):
                return JsonResponse({'error': 'Email and password are required'}, status=400)
            
            user = authenticate(request, email=email, password=password)
            if user is not None:
                if user.is_active:
                    login(request, user)
                    return JsonResponse({'message': 'Login successful'}, status=200)
                else: 
                    return JsonResponse({'error': 'Account is disabled'}, status=403)
            else:
                return JsonResponse({'error': 'Invalid email or password'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'error': 'Only POST method is allowed'}, status=405)
            

logger = logging.getLogger(__name__)

@api_view(['POST'])
def password_reset_request(request):
    email = request.data.get('email')
    
    if not email: 
        logger.error("No email provided")
        return Response({'message': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        User = get_user_model()
        user = User.objects.filter(email__iexact=email).first()
        if user is None:
            return Response({'message': 'User with this email does not exist.'}, status=status.HTTP_400_BAD_REQUEST)
        logger.info(f"User found: {user.email}")
        token = default_token_generator.make_token(user)
        
        logger.info(f"Generated token for {user.email}: {token}")
        reset_url = f"{settings.FRONTEND_URL}/reset-password?token={token}&uid={user.pk}"
        logger.info(f"Reset URL: {reset_url}")

        logger.info(f"Reset URL: {reset_url}")
        send_mail(
            'Password Reset Request',
            f'Click the link to reset your password: {reset_url}',
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
            fail_silently=False,
        )
        
        logger.info("Password reset email sent successfully")
        return Response({'message': 'Password reset link sent.'}, status=status.HTTP_200_OK)
    
    except Exception as e:
        logger.error(f"Error during password reset: {str(e)}")
        return Response({'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def reset_password(request):
    token = request.data.get('token')
    uid = request.data.get('uid')
    new_password = request.data.get('password')

    logger.info(f"Token: {token}, UID: {uid}, New Password: {new_password}")

    if not all([token, uid, new_password]):
        logger.error("Missing required fields.")
        return Response({'message': 'Missing required fields.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        User = get_user_model()
        logger.info(f"Looking for user with UID: {uid}")

        user = get_object_or_404(User, pk=uid)
        logger.info(f"User found: {user.email}")

        
        if not default_token_generator.check_token(user, token):
            logger.error("Invalid or expired token.")
            return Response({'message': 'Invalid or expired token.'}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()
        logger.info("Password reset successfully.")
        
        return Response({'message': 'Password successfully reset.'}, status=status.HTTP_200_OK)

    except Exception as e:
        logger.error(f"Error during password reset: {str(e)}")
        return Response({'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def Home(request):
    return render(request, 'home.html')