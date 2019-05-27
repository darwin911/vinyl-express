# **Vinyl**

http://vinyl.surge.sh/

## Upload your local songs to your account, edit their names, delete from your account, and play them on the record player

Users can choose a file (audio) to upload to their account
- Edit the name of the song/track
- Delete the track
- Play all tracks that have been uploaded

## Feature List (POST MVP)

- User can create a Playlist
- User can add tracks to Playlist
- User can remove tracks to Playlist
- User can order tracks in Playlist
- User can play Full Playlist but not individual tracks
- User can _scroll_ through Playlist

## Technologies

- Express
- Sequelize
- React
- PostgreSQL
- Axios
- Bcrypt
- JsonWebToken (JWT)
- React Bootstrap
- Amazon Web Services (S3 Bucket)
- React-Sound

## ERD (images included in the proposal)

![Entity Relationship Diagram](./ERD.jpg)

## Wireframes (images included in the proposal)

![Wireframe - Main/Player](./wireframe_main.jpg)

![Wireframe - Album](./wireframe_album.jpg)

## M.V.P

- [X] Register
- [X] Login
- [ ] Create Playlist/Album/Set
- [ ] Upload Tracks to Playlist/Album/Set
- [ ] Edit Track order in Playlist/Album/Set
- [ ] Delete Tracks from Playlist/Album/Set
- [ ] Play/Pause/Stop Playlist/Album/Set

## Post M.V.P features

- [] 
- []
- []

## Installation instructions (at the top of the README)

- `git clone http://github.com/darwin911/vinyl-express`
- `npm i`
- `cd client`
- `npm i`

> https://medium.com/@fabianopb/upload-files-with-node-and-react-to-aws-s3-in-3-steps-fdaa8581f2bd
