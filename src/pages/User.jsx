import { Card } from "react-bootstrap";

export default function User() {
  return (
    <div className="row g-4">
      <div className="col-md-12">
         <form>
            <div className="form-group py-2">
                <label for="exampleInputEmail1">User Name</label>
                <input type="text" className="form-control" />
                
            </div>
            <div className="form-group py-2">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" />
            </div>
            <div className="form-group form-check py-2">
                <input type="checkbox" className="form-check-input" id="exampleCheck"></input>
                <label className="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
      </div>
    </div>
  );
}
