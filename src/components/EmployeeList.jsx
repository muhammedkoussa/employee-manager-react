import { useContext, useEffect, useState } from "react"
import { EmployeeContext } from "../contexts/EmployeeContext"
import AddEmployee from "./AddEmployee"
import Employee from "./Employee"
import Pagination from "./Pagination"
import { Modal, Alert } from "react-bootstrap"

const EmployeeList = () => {

    const { sortedEmployees } = useContext(EmployeeContext)

    const [showAlert, setShowAlert] = useState(false)
    const [show, setShow] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [employeesPerPage] = useState(2)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleShowAlert = () => {
        setShowAlert(true)
        setTimeout(() => {
            setShowAlert(false)
        }, 2000)
    }
    useEffect(() => {
        handleClose()
        return () => {
            handleShowAlert()
        }
    }, [sortedEmployees])

    const indexOfLastEmployee = currentPage * employeesPerPage
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage
    const currentEmployees = sortedEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee)
    const totalPagesNum = Math.ceil(sortedEmployees.length / employeesPerPage)

    return (
        <>
            <div className="table-title">
                <div className="row">
                    <div className="col-sm-6">
                        <h2>Manage <b>Employees</b></h2>
                    </div>
                    <div className="col-sm-6">
                        <button onClick={handleShow} className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New Employee</span></button>
                    </div>
                </div>
            </div>
            <Alert show={showAlert} variant="success">
                Employee List Updated Successfully.
            </Alert>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentEmployees.map((employee) => (
                            <tr key={employee.id}>
                                <Employee employee={employee} />
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Pagination pages={totalPagesNum} setCurrentPage={setCurrentPage} sortedEmployees={sortedEmployees} currentEmployees={currentEmployees} />
            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Add Employee
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddEmployee />
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EmployeeList