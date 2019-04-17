import React from 'react'
import { Form, Button, ButtonGroup } from 'react-bootstrap'

const TrackList = (props) => {
  const {
    currentUser,
    tracks,
    isEdit,
    updateForm,
    handleUpdateChange,
    handleUpdateTrack,
    handleEditTrack,
    handleDeleteTrack } = props
  return (
    <section className="section-tracks">
      <h3><span>{currentUser.name.split(' ')[0]}</span> has {tracks.length} tracks</h3>
      {
        tracks
          .map(track =>
            <div key={track.id} className="track">
              {
                isEdit === track.id
                  ?
                  <>
                    <Form.Control
                      className="update-input"
                      type="text"
                      autoComplete="off"
                      name="title"
                      value={updateForm.title}
                      onChange={handleUpdateChange} />
                    <Button variant="warning"
                      onClick={() => handleUpdateTrack(updateForm)}>Update!</Button>
                  </>
                  :
                  <>
                    <Button
                      draggable={true}
                      className="track-name"
                      variant="outline-light"
                      onClick={() => this.setState(prevState => ({
                        currentTrack: {
                          url: track.url,
                          title: track.title,
                          id: track.id,
                        },
                        filename: track.filename
                      }))} >{track.title}</Button>
                  </>
              }
              <ButtonGroup>
                <Button
                  className="edit-btn"
                  size="sm"
                  variant="outline-info"
                  onClick={() => handleEditTrack(track)}>&#9998;</Button>
                <Button
                  className="delete-btn"
                  size="sm"
                  variant="outline-danger"
                  onClick={() => handleDeleteTrack(track.id)}>&#10006;</Button>
              </ButtonGroup>
            </div>
          )
      }
    </section>
  )
}

export default TrackList;