from rest.views import APIView
from rest.response import Response, status
from rest.permissions import AllowAny
from pathlib import Path
import json


class PageView(APIView):
    permission_classes = (AllowAny,)
    pages_dir = 'pages'

    def get(self, request, **kwargs):
        """get page"""
        page_name = kwargs['pagename'] + '.json'
        page_path = Path(__file__).parent.parent / self.pages_dir / page_name
        try:
            with open(page_path) as page:
                content = json.load(page)
        except Exception as e:
            return Response(
                {
                    'message': 'page not found',
                },
                status.HTTP_404_NOT_FOUND
            )
        return Response(
            {
                'name': page_name,
                'content': content
            },
            status.HTTP_200_OK
        )
