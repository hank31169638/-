from django.contrib import admin
from django.urls import path
from .views import post_create, UserSignupView, UserSigninView, generate_auth_code, index

urlpatterns = [
    path("post/", post_create),
    path('signin', UserSigninView.as_view()),
    path('signup', UserSignupView.as_view()),
    path('generate-code', generate_auth_code),
    path('', index),
]
