import { Employee } from "../data/Employee";
import { HTMLComponent } from "./types";

const Card: HTMLComponent<{ employee: Employee[] }> = ({ employee }) => {
    return (
      <ul>
        {employee.map((item) => (
          <>
            <li key={item.name}  className="card">
              {item.name}
              {item.subordinates?.length && <Card employee={item.subordinates} />}
            </li>
          </>
        ))}
      </ul>
    );
  };

  export default Card;