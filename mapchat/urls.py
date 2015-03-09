from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', 'map.views.map'),
    url(r'^api/messages/$', 'api.views.message_list'),
    url(r'^api/messages/(?P<pk>[0-9]+)/$', 'api.views.message_detail'),
)
