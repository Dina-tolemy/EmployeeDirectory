import React from 'react';
import Header from "./Components/header";
import Search from './Components/search';
import Employee from "./Components/employee";
import API from "./Utils/API";


class App extends React.Component {
  state = {
    search: "",
    employees: [],
    filteredEmployees: [],
    order: ""
  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
    if (!value) {
      this.searchEmployee()
    }
  };
  searchEmployee = () => {
    API.getUsers()
      .then(res => this.setState({
        employees: res.data.results,
        filteredEmployees: res.data.results
      }))
      .catch(err => console.log(err));
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { employees, search } = this.state;
    const filteredEmployees = employees.filter(employee =>
      employee.name.first.toLowerCase() === (search.toLowerCase()) || employee.name.last.toLowerCase() === (search.toLowerCase()));

    this.setState({
      filteredEmployees
    });
  };
  sortByName = () => {
    const filteredEmp = this.state.filteredEmployees;
    if (this.state.orderByName === "asc") {
      const SortedEmployees = filteredEmp.sort((a, b) => (a.name.first > b.name.first) ? 1 : -1)
      this.setState({
        filteredEmployees: SortedEmployees,
        orderByName: "desc"
      })
    } else {
      const SortedEmployees = filteredEmp.sort((a, b) => (a.name.first > b.name.first) ? -1 : 1)
      this.setState({
        filteredEmployees: SortedEmployees,
        orderByName: "asc"
      })
    }
  }
  sortByDOB = () => {
    const filteredEmp = this.state.filteredEmployees;
    if (this.state.orderByDate === "asc") {
      const sortedByDobEmp = filteredEmp.sort((a, b) => b.dob.age - a.dob.age)
      this.setState({
        filteredEmployees: sortedByDobEmp,
        orderByDate: "desc"
      })
    } else {
      const sortedByDobEmp = filteredEmp.sort((a, b) => a.dob.age - b.dob.age)
      this.setState({
        filteredEmployees: sortedByDobEmp,
        orderByDate: "asc"
      })
    }
  }
  componentDidMount() {
    API.getUsers().then(res => this.setState({
      employees: res.data.results,
      filteredEmployees: res.data.results
    })).catch(err => console.log(err))
  }
  render() {
    return (
      <div >
        <Header />
        <Search
          value={this.state.search}
          handleInputChange={this.handleInputChange}
          handleFormSubmit={this.handleFormSubmit} />
        <Employee
          results={this.state.filteredEmployees}
          sortByName={this.sortByName}
          sortByDOB={this.sortByDOB} />
      </div >
    );
  }
}

export default App;
