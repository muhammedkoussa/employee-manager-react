import { useContext, useState, useEffect } from "react"
import { EmployeeContext } from "../contexts/EmployeeContext"
import EditEmployee from "./EditEmployee"
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap"

const Employee = ({ employee }) => {

    const { dispatch } = useContext(EmployeeContext)

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    useEffect(() => {
        handleClose()
    }, [employee])

    return (
        <>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.address}</td>
            <td>{employee.phone}</td>
            <td>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>Edit</Tooltip>
                    }
                >
                    <button onClick={handleShow} type="button" className="btn btn-warning me-1"><i className="material-icons" >&#xE254;</i></button>
                </OverlayTrigger>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>Delete</Tooltip>
                    }
                >
                    <button onClick={() => dispatch({ type: 'remove_employee', id: employee.id })} type="button" className="btn btn-danger"><i className="material-icons" >&#xE872;</i></button>
                </OverlayTrigger>
            </td>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Update Employee
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditEmployee theEmployee={employee} />
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

export default Employee
