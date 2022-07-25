from rest.views import APIView
from rest.response import Response, status
from rest.permissions import IsAuthenticated
from .tools.image_compressor import ImageCompressor


def pick_attribute(user, k, compressed_photo) -> str:
    if k == 'id':
        return user.id
    if k == 'username':
        return user.username
    if k == 'firstName':
        return user.first_name
    if k == 'lastName':
        return user.last_name
    if k == 'email':
        return user.email
    if k == 'phone':
        return user.phone
    return compressed_photo or user.photo


class UserView(APIView):
    permission_classes = (IsAuthenticated,)
    user_fields = {"username", "firstName", "lastName", "email", "phone", "photo"}

    def get(self, request):
        """get current user info"""
        compressed_photo = None
        if 'photo_quality' in request.query_params:
            compressed_photo = ImageCompressor.compress_image(request.user.photo,
                                                              quality_key=request.query_params['photo_quality'])

        if not request.query_params or len(request.query_params) == 1 and compressed_photo:
            return Response(
                {
                    "id": request.user.id,
                    "username": request.user.username,
                    "firstName": request.user.first_name,
                    "lastName": request.user.last_name,
                    "email": request.user.email,
                    "phone": request.user.phone,
                    "photo": compressed_photo or request.user.photo
                },
                status.HTTP_200_OK
            )
        return Response(
            {k: pick_attribute(request.user, k, compressed_photo) for k in request.query_params if
             k in self.user_fields or k == "id"},
            status.HTTP_200_OK
        )

    def put(self, request):
        """updates user info"""
        user_info = request.data
        has_changed = False
        if not set(user_info).issubset(self.user_fields):  # check if only valid keys are provided
            first_error = None
            for key in user_info.keys():  # find first invalid key
                if key not in self.user_fields:
                    first_error = key
                    break
            return Response(
                {
                    "message": f"invalid parameter {first_error}",
                },
                status.HTTP_400_BAD_REQUEST
            )
        if "username" in user_info:
            if not user_info["username"]:  # maybe it's better to change model
                return Response(
                    {
                        "message": f"Username cannot be an empty string. No changes applied!",
                    },
                    status.HTTP_400_BAD_REQUEST
                )
            if not has_changed:
                has_changed = not request.user.username == user_info["username"]
            request.user.username = user_info["username"]
        if "firstName" in user_info:
            if not has_changed:
                has_changed = not request.user.first_name == user_info["firstName"]
            request.user.first_name = user_info["firstName"]
        if "lastName" in user_info:
            if not has_changed:
                has_changed = not request.user.last_name == user_info["lastName"]
            request.user.last_name = user_info["lastName"]
        if "email" in user_info:
            if not has_changed:
                has_changed = not request.user.email == user_info["email"]
            request.user.email = user_info["email"]
        if "phone" in user_info:
            if not has_changed:
                has_changed = not request.user.phone == user_info["phone"]
            request.user.phone = user_info["phone"]
        if "photo" in user_info:
            if not has_changed:
                has_changed = not request.user.photo == user_info["photo"]
            request.user.photo = user_info["photo"]
        if has_changed:
            try:
                request.user.save()
            except Exception as e:  # unique constraint
                return Response(
                    {
                        "message": str(e).replace('"', "'").replace('\n', ' '),
                    },
                    status.HTTP_400_BAD_REQUEST
                )
            return Response(
                {
                    "username": request.user.username,
                    "firstName": request.user.first_name,
                    "lastName": request.user.last_name,
                    "email": request.user.email,
                    "phone": request.user.phone,
                    "photo": request.user.photo
                },
                status.HTTP_200_OK
            )
        return Response(
            {
                "message": "no changes made",
            },
            status.HTTP_400_BAD_REQUEST
        )
