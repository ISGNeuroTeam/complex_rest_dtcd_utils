from rest.views import APIView
from rest.response import Response, status
from rest.permissions import IsAuthenticated


class UserView(APIView):
    permission_classes = (IsAuthenticated,)
    user_fields = {"username", "firstName", "lastName", "email", "phone", "photo"}

    def get(self, request):
        """get current user info"""
        return Response(
            {
                "id": request.user.id,
                "username": request.user.username,
                "firstName": request.user.first_name,
                "lastName": request.user.last_name,
                "email": request.user.email,
                "phone": request.user.phone,
                "photo": request.user.photo
            },
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
        else:
            return Response(
                {
                    "message": "no changes made",
                },
                status.HTTP_304_NOT_MODIFIED
            )
