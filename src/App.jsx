import { Button, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap';
import axios from 'axios'
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import CustomNavbar from './components/CustomNavbar'
import SearchAccounts from './components/SearchAccounts';

function App() {

  const [modal, setModal] = useState(false);

  const [accounts,setAccounts]=useState([]);

  const [updateModal,setUpdateModal] = useState(false);

  const updateToggle = () => {
    setUpdateModal(!updateModal)
  }

  const toggle = () => {
    setModal(!modal)
    setNewAccount({
      accountNumber:'',
      name:'',
      amount:'',
      village:'',
      mobileNumber:''
    })
  };


  const printAccounts = () => {
    
  }

  const [newAccount,setNewAccount]=useState({
    accountNumber:'',
    name:'',
    amount:'',
    village:'',
    mobileNumber:''
  })

  const handleChange = (e) => {
      const {name,value} = e.target
      setNewAccount((prevdata) => {
        return {
          ...prevdata,
          [name]:value,
        
        }
      })     
      
  }


  const getAccounts =  () => {
    return axios.get("http://localhost:8080/api/accounts/list").then((response) => response).catch((error) => {
      toast.error("Server unreachable...!")
    })
  }


  const fetchAccouts = () => {
    getAccounts().then((response) =>{
      setAccounts(response.data) // Assuming the server returns an array of accounts
      console.log(response.data);
      
    })
  }

  // Fetch accounts when the component mounts
  useEffect(() => {
    fetchAccouts();
  }, []);

  const addNewAccount = () =>{
    axios.post("http://localhost:8080/api/accounts/add",newAccount)
       .then((response) =>{
        toast.success("Account added..!")
        toggle()
        fetchAccouts()
       }).catch((error) => {
        toast.error("server did not respond..!")
        toggle()
       })
  }

  const deleteAccount = (e) =>{
    const accountNumber =e.target.value
    console.log("delete account with Account Number :" + accountNumber);
    axios.delete("http://localhost:8080/api/accounts/"+accountNumber)
      .then((response) =>{
        toast.success("Account deleted..!")
        fetchAccouts()
      }).catch((error) => {
        toast.error("Server did not responded")
      })

  }

  const updateAccount =(e) =>{
    const acc=e.target.closest("tr")
    setNewAccount({
      accountNumber:acc.children[1].innerHTML,
      name:acc.children[2].innerHTML,
      amount:acc.children[3].innerHTML,
      village:acc.children[4].innerHTML,
      mobileNumber:acc.children[5].innerHTML,
    })
    updateToggle()
        
  }

  const submitUpdateAccount =()=>{
    axios.post("http://localhost:8080/api/accounts/update/"+newAccount.accountNumber,newAccount)
      .then((response) =>{
        toast.success("Account updated..!")
        fetchAccouts()
        setNewAccount({
          accountNumber:'',
          name:'',
          amount:'',
          village:'',
          mobileNumber:''
        })
        updateToggle()

      }).catch((error) =>{
        toast.error("sever error..!")
      })
    
    
  }

  return (
    <>

    {/* this is add new account modal */}
    <Modal isOpen={modal} toggle={toggle}>
    <ModalHeader toggle={toggle}>Modal title</ModalHeader>
    <ModalBody>
      <Form>
        {/* account number */}
        <FormGroup>
          <Label for='accountNumber'>Account Number</Label>
          <Input
            id='accountNumber'
            name='accountNumber'
            onChange={handleChange}
            placeholder='Account Number'
            value={newAccount.accountNumber}
            type='text'
          />
        </FormGroup>
        {/* name */}
        <FormGroup>
          <Label for='name'>Name</Label>
          <Input
            id='name'
            name='name'
            onChange={handleChange}
            placeholder='Name'
            value={newAccount.name}
            type='text'
          />
        </FormGroup>
        {/* amount */}
        <FormGroup>
          <Label for='amount'>Amount</Label>
          <Input
            id='amount'
            name='amount'
            onChange={handleChange}
            placeholder='Amount'
            value={newAccount.amount}
            type='text'
          />
        </FormGroup>
        {/* village */}
        <FormGroup>
          <Label for='village'>Village</Label>
          <Input
            id='village'
            name='village'
            onChange={handleChange}
            placeholder='Village'
            value={newAccount.village}
            type='text'
          />
        </FormGroup>
        {/* Mobile Number */}
        <FormGroup>
          <Label for='mobileNumber'>Mobile Number</Label>
          <Input
            id='mobileNumber'
            name='mobileNumber'
            onChange={handleChange}
            placeholder='Mobile Number'
            value={newAccount.mobileNumber}
            type='text'
          />
        </FormGroup>
      </Form>
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={addNewAccount}>
        Add
      </Button>{' '}
      <Button color="secondary" onClick={toggle}>
        Cancel
      </Button>
    </ModalFooter>
    </Modal>

    {/* this is update account modal */}
    <Modal isOpen={updateModal} toggle={updateToggle}>
        <ModalHeader toggle={updateToggle}>Update Account</ModalHeader>
        <ModalBody>
          <Form>
            {/* account number */}
            <FormGroup>
              <Label for='accountNumber'>Account Number</Label>
              <Input
                disabled
                id='accountNumber'
                name='accountNumber'
                onChange={handleChange}
                placeholder='Account Number'
                value={newAccount.accountNumber}
                type='text'
              />
            </FormGroup>
            {/* name */}
            <FormGroup>
              <Label for='name'>Name</Label>
              <Input
                id='name'
                name='name'
                onChange={handleChange}
                placeholder='Name'
                value={newAccount.name}
                type='text'
              />
            </FormGroup>
            {/* amount */}
            <FormGroup>
              <Label for='amount'>Amount</Label>
              <Input
                id='amount'
                name='amount'
                onChange={handleChange}
                placeholder='Amount'
                value={newAccount.amount}
                type='text'
              />
            </FormGroup>
            {/* village */}
            <FormGroup>
              <Label for='village'>Village</Label>
              <Input
                id='village'
                name='village'
                onChange={handleChange}
                placeholder='Village'
                value={newAccount.village}
                type='text'
              />
            </FormGroup>
            {/* Mobile Number */}
            <FormGroup>
              <Label for='mobileNumber'>Mobile Number</Label>
              <Input
                id='mobileNumber'
                name='mobileNumber'
                onChange={handleChange}
                placeholder='Mobile Number'
                value={newAccount.mobileNumber}
                type='text'
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="warning" onClick={submitUpdateAccount}>
            Update
          </Button>{' '}
          <Button color="secondary" onClick={updateToggle}>
            Cancel
          </Button>
        </ModalFooter>
        </Modal>


    {/* actual view */}
    <CustomNavbar />

    <Button onClick={toggle} className='m-2'>Add Account</Button>
    <SearchAccounts accountList={setAccounts} />
    <Button onClick={printAccounts} className='m-2'>Print</Button>
    <Button className='mx-2' onClick={() =>{
      fetchAccouts()
    }}>Back</Button>
    <Container>
    <Table
    className='mt-5'
    bordered
    hover
    responsive
    striped
    >
  <thead>
    <tr>
      <th>
        Sr. No.
      </th>
      <th>
        Account Number
      </th>
      <th>
        Name
      </th>
      <th>
        Amount
      </th>
      <th>
        Village
      </th>
      <th>
        Mobile Number
      </th>
    </tr>
  </thead>
  <tbody>
    {accounts.map((account,index) => {
      return (
        <tr key={index}>
          <th scope="row">
            {index+1}
          </th>
          <td>
            {account.accountNumber}
          </td>
          <td>
            {account.name}
          </td>
          <td>
            {account.amount}
          </td>
          <td>
            {account.village}
          </td>
          <td>
            {account.mobileNumber}
          </td>
          <td>
            <Button value={account.accountNumber}  color='warning' onClick={updateAccount} >Info</Button>
          </td>
          <td>
          <Button color='danger' value={account.accountNumber} onClick={deleteAccount} >Delete</Button>
          </td>
        </tr>
      )
    })}
  </tbody>
</Table></Container>
    </>
  )
}

export default App
