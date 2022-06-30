from rest.views import APIView
from rest.response import status, SuccessResponse, ErrorResponse, Response
from rest.permissions import AllowAny
from rest_framework.request import Request
from .utils.primitive import Primitive
import logging


logger = logging.getLogger('dtcd_utils')


class PrimitivesView(APIView):
    permission_classes = (AllowAny,)
    http_method_names = ['get', 'post', 'put', 'delete']

    @staticmethod
    def primitive_data_is_valid(primitive_data: dict):
        return 'name' in primitive_data

    def get(self, request):
        return Response(
            Primitive.list_primitives(), status.HTTP_200_OK
        )

    def post(self, request: Request):
        primitive_data = request.data
        if not self.primitive_data_is_valid(primitive_data):
            return ErrorResponse(error_message="name not provided")
        try:
            Primitive(name=primitive_data['name'], content=primitive_data.get('content', {})).save()
        except Exception as e:
            return ErrorResponse(error_message=str(e))
        return SuccessResponse({"message": "primitive created"})

    def put(self, request: Request):
        primitive_data = request.data
        if not self.primitive_data_is_valid(primitive_data):
            return ErrorResponse(error_message="name not provided")
        try:
            Primitive(name=primitive_data['name'], content=primitive_data.get('content'))\
                .update(primitive_data.get('new_name'))
        except FileNotFoundError as e:
            return ErrorResponse(error_message="No such primitive found")
        except Exception as e:
            return ErrorResponse(error_message=str(e))
        return SuccessResponse({"message": "primitive updated"})

    def delete(self, request: Request):
        if request.data:
            primitive_name = request.data[0]
        else:
            return ErrorResponse(error_message='name not provided')
        try:
            Primitive(name=primitive_name).delete()
        except Exception as e:
            return ErrorResponse(error_message=str(e))
        return SuccessResponse({"message": "primitive deleted"})
