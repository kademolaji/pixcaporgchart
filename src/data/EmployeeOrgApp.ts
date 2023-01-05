import { Employee } from "./Employee";
import { IEmployeeOrgApp } from "./IEmployeeOrgApp";

export class EmployeeOrgApp implements IEmployeeOrgApp {
    private history: { move: { employeeID: number, supervisorID: number }, undo: { employeeID: number, supervisorID: number } }[] = [];
    private historyIndex = -1;
  
    constructor(public ceo: Employee) {}
  
    move(employeeID: number, supervisorID: number): void {
      // Find employee and supervisor
      const employee = this.findEmployee(this.ceo, employeeID);
      const supervisor = this.findEmployee(this.ceo, supervisorID);
      if (!employee || !supervisor) return;
  
      // Remove employee from current subordinates
      const currentSupervisor = this.findSupervisor(this.ceo, employeeID);
      if(currentSupervisor){
      currentSupervisor.subordinates = currentSupervisor.subordinates.filter(e => e.uniqueId !== employeeID);
      }
      // Add employee to new supervisor's subordinates
      supervisor.subordinates.push(employee);
  
      // Add action to history
      this.history = this.history.slice(0, this.historyIndex + 1);
      this.history.push({
        move: { employeeID, supervisorID },
        undo: { employeeID: supervisor.uniqueId, supervisorID: currentSupervisor.uniqueId }
      });
      this.historyIndex++;
    }
  
    undo(): void {
      if (this.historyIndex < 0) return;
  
      // Get last action and undo it
      const { move, undo } = this.history[this.historyIndex];
      this.move(undo.employeeID, undo.supervisorID);
  
      // Decrement history index
      this.historyIndex--;
    }
  
    redo(): void {
      if (this.historyIndex >= this.history.length - 1) return;
  
      // Increment history index
      this.historyIndex++;
  
      // Get next action and redo it
      const { move } = this.history[this.historyIndex];
      this.move(move.employeeID, move.supervisorID);
    }
  
    private findEmployee(employee: Employee, uniqueId: number): Employee | undefined {
      if (employee.uniqueId === uniqueId) return employee;
      for (const subordinate of employee.subordinates) {
        const found = this.findEmployee(subordinate, uniqueId);
        if (found) return found;
      }
    }
  
    private findSupervisor(employee: Employee, uniqueId: number): Employee {
      if (employee.subordinates.some(e => e.uniqueId === uniqueId)) return employee;
      for (const subordinate of employee.subordinates) {
        const supervisor = this.findSupervisor(subordinate, uniqueId);
        if (supervisor) return supervisor;
      }
      return employee
    }
  }

  

//   const app = new EmployeeOrgApp(ceo);
// app.move(2, 3); // Move Sarah under Cassandra
// app.move(4, 2); // Move Mary under Sarah
// app.undo(); // Undo last move (move Mary back under Cassandra)
// app
