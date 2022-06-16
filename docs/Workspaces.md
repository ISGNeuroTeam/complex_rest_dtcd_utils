# Workspaces and the way of organizing them

## Directories

Previously you were able to save workspaces only in a special workspaces root folder (dtcd_server/workspaces is default value in configuration workspace.base_path)

Now you have the opportunity to create dirs inside this directory and place your workspaces there

## How it works

In the endpoint url you can now specify the path to directory you are interested in. The path will be concatenated with special workspaces root folder (configured in workspace.base_path)

`'workspace/object/<path:workspace_path>'`

- GET: by default list all workspaces' info in specified directory. To specify one workspace you need to add id as a query string parameter. Example: `?id=c3fffa8a-2ac8-4225-a44d-ebb339f916f7` 
- POST: to create workspace you need to specify it as json dictionary inside an array. As a response POST will return the same info, but with id generated for this workspace. Example: `[{"title":"myworkspace", "content": "123"}]`
- PUT: works as POST but requires id. You can change either title or content or both. Returns array with id of changed workspace. Example: `[{"title":"yourworkspace", "content": "789", "id":"c3fffa8a-2ac8-4225-a44d-ebb339f916f7"}]`
- DELETE: requires the id of the workspace inside array. Returns "success" Example: `["c3fffa8a-2ac8-4225-a44d-ebb339f916f7"]`

`'workspace/dir/<path:workspace_path>'`

- GET: by default list all directories' info in specified directory. To specify one directory you need to add dir as a query string parameter. Example: `?dir=bud` 
- POST: to create directory you need to specify it as json dictionary inside an array. As a response POST will return the same info. Example: `[{"name": "avl"}]`
- PUT: you have 2 options. To change the name of the directory you need to specify old_name and new_name as json dictionary inside an array. Example: `[{"old_name": "root", "new_name": "rat"}]`. To move directory elsewhere instead of new_name, you need to specify new_path. If both are provided new_path has higher precedence. Example: `[{"old_name": "tree", "new_path": "bud/avl"}]`. Returns the absolute path to the dir. MOVE IS CURRENTLY NOT WORKING BECAUSE OF ROLE MODEL ISSUES.
- DELETE: requires the name of the directory inside array. Returns "success" Example: `["tree"]`


## Note: 

- All the directories should be created explicitly!
- For security reasons **//** or **..** are not allowed in **workspace_path**
