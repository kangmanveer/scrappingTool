import React from 'react'
import Table from 'react-bootstrap/Table';

export const Makes = ({makes}) => {

    const MakesRow = (customer,index) => {

        return(
              <tr key = {index} className='even'>
                  <td> {index + 1} </td>
                  <td>{customer.data}</td>
              </tr>
          )
      }

      const DataTable = makes.map((cust,index) => MakesRow(cust,index))

      const tableHeader = <thead className='bgvi'>
                            <tr>
                                <th>#</th>
                                <th>Makes</th>
                            </tr>
                        </thead>

    return (
        <Table striped bordered hover>
            {tableHeader}
            <tbody>
                {DataTable}
            </tbody>
        </Table>
    )
}
