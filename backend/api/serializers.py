from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['title', 'content', 'status', 'publish_date', 'slug']
        read_only_fields = ['slug']  # 将slug设置为只读字段


class UserSignupSerializers(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, data):

        if data['password'] != data['password2']:
            raise serializers.ValidationError("密碼不一致")
        return data

    def save(self):
        account = User(
            email=self.validated_data['email'],
            username=self.validated_data['username']
        )
        password = self.validated_data['password']
        account.set_password(password)
        account.save()
        # 回傳到前端一個account對象
        return account


class UserSigninSerializers(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')
        user = authenticate(username=username, password=password)
        if not user:
            raise serializers.ValidationError({'errors': "Invalid username or password."})
        return {'user': user}