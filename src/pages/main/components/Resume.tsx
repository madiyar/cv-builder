import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { context } from 'utils';
import { Card, Dimmer, Image, Button } from 'semantic-ui-react'

const thumbnail = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcOnHifwAGMgK4RoxAtgAAAABJRU5ErkJggg==";

interface ResumeProps {
  data: {
    id: string,
    name: string,
    date: Date
  }
};

const Resume:React.FC<ResumeProps> = ({ data }) => {
  const [active, setShow] = useState<boolean>(false);
  const { remove, duplicate } = useContext<any>(context);

  const content = (
    <>
      <Button
        fluid
        primary
        content="Edit"
        icon="edit outline"
        as={Link}
        to={`/edit/${data.id}`}
        style={{ marginBottom: 8 }}
      />
      <Button
        fluid
        content="Duplicate"
        icon="copy outline"
        onClick={() => duplicate(data)}
        style={{ marginBottom: 8 }}
      />
      <Button
        fluid
        content="Delete"
        icon="trash alternate outline"
        color="red"
        onClick={() => remove(data.id)}
      />
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
