import {Component} from "react";
import EmployeeService from "../services/employee.service";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class EmployeesComponent extends Component {
    constructor(props) {
        super(props);
        this.retrieveEmployees = this.retrieveEmployees.bind(this);
        this.createAnEmployee = this.createAnEmployee.bind(this);
        this.deleteAnEmployee = this.deleteAnEmployee.bind(this);

        this.state = {
            employees: [],
            currentIndex: 0
        };
    }

    componentDidMount() {
        this.retrieveEmployees();
    }

    retrieveEmployees() {
        EmployeeService.getByPerPage(12)
            .then(response => {
                let data = response.data.data;
                this.setState({
                    employees: data,
                    currentIndex: this.state.currentIndex + data.length + 1
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    createAnEmployee() {
        let firstName = document.getElementById("firstName");
        let lastName = document.getElementById("lastName");
        let currentIndex = this.state.currentIndex;
        this.setState({
            currentIndex: currentIndex + 1
        })
        let newEmployee = {
            id: currentIndex,
            email: `example${currentIndex}@gamil.com`,
            first_name: firstName.value,
            last_name: lastName.value,
            avatar: `avatar.com/some/avatar${currentIndex}`
        }

        firstName.value = "";
        lastName.value = "";

        this.state.employees.push(newEmployee);
        this.setState({
            employees: this.state.employees
        })

    }

    deleteAnEmployee(id) {
        let employees = this.state.employees;
        employees = employees.filter(el => {
            return el.id !== id
        });
        this.setState({
            employees : employees
        })
    }

    render() {
        const {employees} = this.state;
        return (
            <div>
                <div className="row">
                    <div className="col-2">
                        <h4>Employees</h4>
                    </div>
                    <div className="col-8">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {employees.map((e) => (
                                <tr>
                                    <td id={"efn-" + e.id} key={"efn-" + e.id}>{e.first_name}</td>
                                    <td id={"eln-" + e.id} key={"eln-" + e.id}>{e.last_name}</td>
                                    <td id={"de-" + e.id} key={"de-" + e.id}>
                                        <button type="button" onClick={() => {this.deleteAnEmployee(e.id)}} className="close" style={{color: "red"}}>
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-2">
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-2">
                        <h4>Create an employee</h4>
                    </div>
                    <div className="col-8">
                        <div className="input-group">
                            <input id="firstName" type="text" className="form-control" placeholder="First Name"/>
                            <input id="lastName" type="text" className="form-control" placeholder="Last Name"/>
                            <button className="btn btn-primary ml-2" onClick={() => this.createAnEmployee()}>Create</button>
                        </div>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
        );
    }
}