import { Card } from "react-bootstrap";

export default function Dashboard() {
  
  return (
    <div className="row g-4">
      <div className="col-md-3">
        <Card className="shadow-sm">
          <Card.Body>
            <div>Total Users</div>
            <h3>1245</h3>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
