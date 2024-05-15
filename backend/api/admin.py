from django.contrib import admin
from .models import Post, AuthorizationCode

admin.site.register(Post)
class AuthorizationCodeAdmin(admin.ModelAdmin):
    list_display = ('code', 'created_at', 'is_used')  # 控制列表页面显示哪些字段
    list_filter = ('is_used',)  # 添加侧边栏过滤器
    search_fields = ('code',)  # 添加搜索框，按代码搜索
    ordering = ('-created_at',)  # 设置默认排序

admin.site.register(AuthorizationCode, AuthorizationCodeAdmin)

