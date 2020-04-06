import React from 'react';
import Moment from 'react-moment';

function Employee(props) {

    return (
        <div>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col"><strong>I</strong>mage</th>
                        <th scope="col" 
                        onClick={props.sortByName} 
                        style={{ cursor: 'pointer'}}><strong>N</strong>ame</th>
                        <th scope="col"><strong>E</strong>mail</th>
                        <th scope="col"><strong>P</strong>hone</th>
                        <th scope="col" 
                         onClick={props.sortByDOB} 
                         style={{ cursor: 'pointer'}}><strong>D</strong>OB</th>
                    </tr>
                </thead>
                <tbody>
                {props.results.map(result => (
                    <tr className="table" key={result.login.uuid}>
                        <td> <img className="
                        "src={result.picture.medium} alt="" /></td>
                        <td>{result.name.first + " " + result.name.last}  </td>
                        <td className="email"><a href={result.email}>{result.email}</a></td>
                        <td>{result.cell}</td>
                        <td><Moment format="MM-DD-YYYY">{result.dob.date}</Moment></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Employee;