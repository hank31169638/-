from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from .serializers import PostSerializer, UserSignupSerializers, UserSigninSerializers
from .models import AuthorizationCode

from django.conf import settings


def index(request):
    return render(request, 'index.html')


@api_view(['POST'])
def post_create(request):
    if request.method == 'POST':
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)  # 保存时添加作者信息
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserSignupView(APIView):
    def post(self, request):
        serializer = UserSignupSerializers(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            response = Response({'status': 'success', 'token': token.key}, status=status.HTTP_201_CREATED)
            response.set_cookie(
                'auth_token',
                token.key,
                httponly=Token,
                samesite='Strict'
            )
            return response
        else:
            return Response({
                'status': 'error',
                'message': 'signup failed',
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)


class UserSigninView(APIView):
    def post(self, request):
        serializer = UserSigninSerializers(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data['user']

            token, created = Token.objects.get_or_create(user=user)
            response = Response({'status': '200', 'username': f'{user}'}, status=status.HTTP_200_OK)
            response.set_cookie(
                'auth_token',
                token.key,
                httponly=Token,
                samesite='Strict'
            )
            # reset the signin attempt
            return response
        else:
            return Response({"status": '401', 'errors': "登入失敗，請確認帳號密碼是否正確。"},
                            status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@renderer_classes((JSONRenderer,))
def generate_auth_code(request):
    if request.data.get('auth_code') == settings.AUTH_KEY:
        auth_code = AuthorizationCode()
        auth_code.save()
        return Response({'auth_code': auth_code.code})
    else:
        return Response({'message': 'Unauthorized'}, status=401)
