from django.shortcuts import render
from django.shortcuts import render_to_response

# Create your views here.
def index(request):
    return render_to_response("map/map.html", {}, context_instance=RequestContext(request))
