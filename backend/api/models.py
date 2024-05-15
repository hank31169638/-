from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify

from django.utils import timezone
from django.urls import reverse

import uuid


class Post(models.Model):
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )
    title = models.CharField(max_length=250)
    slug = models.SlugField(max_length=250, unique=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blog_posts')
    # related_name --> 預設 獲得物件後
    # user = User.objects.get(id=1)
    # user_blog_posts = user.blog_posts.all()
    # 預設是model的name+_set  這樣可以提高可讀性

    content = models.TextField()
    publish_date = models.DateTimeField(default=timezone.now)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')

    class Meta:
        ordering = ('-publish_date',)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        # 如果未設置 slug，則根據 title 生成
        if not self.slug:
            self.slug = slugify(self.title)
            # 確保 slug 的唯一性
            original_slug = self.slug
            num = 1
            while Post.objects.filter(slug=self.slug).exists():
                self.slug = '{}-{}'.format(original_slug, num)
                num += 1
        super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse('blog:post_detail',
                       args=[self.publish_date.year, self.publish_date.month, self.publish_date.day, self.slug])


class AuthorizationCode(models.Model):
    code = models.CharField(max_length=100, unique=True, default=uuid.uuid4)
    created_at = models.DateTimeField(auto_now_add=True)
    is_used = models.BooleanField(default=False)

    def is_valid(self):
        return (timezone.now() - self.created_at) <= timezone.timedelta(hours=1) and not self.is_used
