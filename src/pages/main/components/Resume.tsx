import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Dimmer, Image, Button } from 'semantic-ui-react'
import { AppContext } from '../../../App';

const thumbnail = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcOnHifwAGMgK4RoxAtgAAAABJRU5ErkJggg==";

const Resume = ({ data }: { data: any}) => {
  const [active, setShow] = useState(false);
  const { deleteResume } = useContext<any>(AppContext);

  const content = (
    <>
      <Button as={Link} to={`/edit/${data.id}`} primary fluid style={{ marginBottom: 8 }}>Edit</Button>
      <Button color="red" fluid onClick={() => deleteResume(data.id)}>Delete</Button>
    </>
  );

  return (
    <Card>
      <Dimmer.Dimmable
        as={Image}
        dimmed={active}
        dimmer={{ active, content }}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        size='medium'
        src={thumbnail}
      />
      <Card.Content>
        <Card.Header>{data?.name || 'Draft'}</Card.Header>
        <Card.Meta>Saved {new Date(data.date).toISOString()}</Card.Meta>
      </Card.Content>
    </Card>
  )
};

export default Resume;
