# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.3] - 2023-08-04
### Fixed
- Fixed `ascii codec can't decode` error in rawPrimitive endpoint 
 
## [1.2.2] - 2022-12-27
### Added
- Added `groups` field in user endpoint 

## [1.2.1] - 2022-09-22
### Fixed:
- No photo compression when user has no photo

## [1.2.0] - 2022-08-10

### Added:
- User photo size reduction
- DTCD logs integration into OTP

## [1.1.0] - 2022-07-22

### Added:
- Raw primitives support

## [1.0.1] - 2022-06-30

### Fixed:
- Guidelines following

## [1.0.0] - 2022-06-29

### Changed
- Graphs and Workspaces removed from plugin

### Added
- Primitives support added

## [0.2.2] - 2022-06-16
### Fixed
- Freeze package versions in requirements file.

## [0.2.1] - 2022-06-16
### Added
- Fragment management and full support for graph-related operations.

### Changed
- URL layout for graph operations.
- Adopted convention for no trailing slashes at the end of URLs.

### Fixed
- `.gitkeep` absence now doesn't error out when listing plugins and workspaces.

## [0.2.0] - 2022-05-18
### Changed
- Graphs are now handled by means of neo4j instead of file system.
- Project is now called dtcd_server, not mock_server.

### Added
- User change password endpoint.
- Access to pages.
- Additional fields for User needed by DTCD.
