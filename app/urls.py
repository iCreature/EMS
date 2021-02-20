from django.conf.urls import url
from django.conf.urls.static import static
from django.conf import settings
from app import views

urlpatterns=[
    url(r'^departments/$',views.departmentApi),
    url(r'^departments/([0-9]+)$',views.departmentApi),
    url(r'^employee/$',views.employeeApi),
    url(r'^employee/([0-9]+)$',views.employeeApi),
    url(r'^SaveFile$',views.SaveFile),
    
]+ static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)