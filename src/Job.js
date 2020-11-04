import React, { useState } from 'react'
import { Card, Badge, Button, Collapse } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'

export default function Job({ job }) {
  const [open, setOpen] = useState(false)

  return (
      
    <Card className="mb-3 bg-secondary"> 
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div>
            <Card.Title className="text-white">
              {job.title} - <span className="text-light font-weight-light">{job.company}</span>
            </Card.Title>
            <Card.Subtitle className="text-light mb-2">
              {new Date(job.created_at).toLocaleDateString()}
            </Card.Subtitle>
            <Badge variant="success" className="mr-2">{job.type}</Badge>
            <Badge variant="light">{job.location}</Badge>
            <div style={{ wordBreak: 'break-all' }}>
              <ReactMarkdown className="text-light mt-3" source={job.how_to_apply} />
            </div>
          </div>
          <img className="d-none d-md-block" height="50" alt={job.company} src={job.company_logo} />
        </div>
        <Card.Text>
          <Button
            onClick={() => setOpen(prevOpen => !prevOpen)}
            variant="primary"
          >
            {open ? 'Hide Details' : 'View Details'}
          </Button>
        </Card.Text>
        <Collapse in={open}>
          <div className="mt-4">
            <ReactMarkdown source={job.description} />
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  )
}