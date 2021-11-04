from rest.views import APIView
from rest.response import Response, status
from rest.permissions import AllowAny
from rest_framework.request import Request
from pathlib import Path
import os
import logging

logger = logging.getLogger('mock_server')


class Graph(APIView):
    permission_classes = (AllowAny,)
    http_method_names = ['get', 'post', 'put', 'delete']

    def post(self, request):
        count = 0
        graphs = request.data
        for graph in graphs:
            if not (graph["name"]) in os.listdir(Path(__file__).parent / "../graphs"):
                with open(os.path.join(Path(__file__).parent / "../graphs/", graph["name"]), "w") as file:
                    file.write(graph["content"])
                count += 1
        if count == len(graphs):  # always one
            return Response(
                {"status": "SUCCESS", "count": count},
                status.HTTP_200_OK
            )
        return Response(
            {"status": "ERROR", "count": count},
            status.HTTP_400_BAD_REQUEST
        )

    def put(self, request: Request):
        count = 0
        graphs = request.data
        file_list = os.listdir(Path(__file__).parent / "../graphs")
        file_list.remove(".gitkeep")
        for graph in graphs:
            if file_list[graph["id"]]:
                if "content" in graph:
                    with open(os.path.join(Path(__file__).parent / "../graphs/", file_list[graph["id"]]), "w") as file:
                        file.write(graph["content"])
                if "name" in graph and graph["name"] != file_list[graph["id"]]:
                    source = Path(__file__).parent / "../graphs" / file_list[graph["id"]]
                    target = Path(__file__).parent / "../graphs" / graph["name"]
                    os.rename(source, target)
                count += 1
        if count == len(graphs):  # always one
            return Response(
                {"status": "SUCCESS", "count": count},
                status.HTTP_200_OK
            )
        return Response(
            {"status": "ERROR", "count": count},
            status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request):
        ids = request.data
        file_list = os.listdir(Path(__file__).parent / "../graphs")
        file_list.remove(".gitkeep")
        count = 0
        for id in ids:
            os.remove(Path(__file__).parent / "../graphs" / file_list[id])
            count += 1
        if count == len(ids):  # always one
            return Response(
                {"status": "SUCCESS", "count": count},
                status.HTTP_200_OK
            )
        return Response(
            {"status": "ERROR", "count": count},
            status.HTTP_400_BAD_REQUEST
        )

    def get(self, request:Request):
        qs = dict(request.query_params)
        file_list = os.listdir(Path(__file__).parent / "../graphs")
        file_list.remove(".gitkeep")
        if 'id' not in qs or int(qs['id'][0]) >= len(file_list):
            return Response([{"name": file_name, "id": index} for index, file_name in enumerate(file_list)], status.HTTP_200_OK)
        id = int(qs['id'][0])
        with open(Path(__file__).parent / "../graphs" / file_list[id], 'r') as file:
            content = file.read()
        return Response({"id": id, "name": file_list[id], "content": content, "status": "SUCCESS"}, status.HTTP_200_OK)
