<h2>#About Kata Library Managment System</h2>
<p>The Library Management System is a focused platform designed to streamline core library operations. It allows librarians to add books to the collection, and users can easily borrow and return books. Additionally, it provides a straightforward way to view available books, ensuring efficient management and a user-friendly experience.</p>
<hr>
<h2>#Requirements For Project For TDD(Test Driven Development)</h2>
<p>
   1.ts-jest: 29.2.5 <br>
  2. typescript: 5.5.4<br>
  3.jest : 29.5.2 <br>
</p>

<h3>
  # installing   Dependecies
</h3>
<p>Use command  <b>"npm i"</b></p>
<hr>
<h2>Functions Of Project</h2>
<ol>
  <li><b>addUser</b>:: to add new user </li>
    <li><b>addBook</b> :: to add book</li>
    <li><b>borrowBook</b> :: user can borrow book by using this function</li>
    <li><b>returnBook</b> :: it will user when user want to return book to library</li>
    <li><b>getAvailableBooks</b> :: it will return all the availble books in library</li>
    <li><b>getUserBorrowedBooks</b> :: it will return books borrowed by perticular user by user Id </li>
</ol>

<hr>
<h3>
  #Run Project
</h3>

<h4> 1. use command : <b>npm run build</b></h4> 
  for making build of project

  <hr>
  <h4>
  2. now use command  : <b>npm run test</b><br>
  </h4>
  this command will run all the test cases against all the function of project<br>
  this command generate result.json file which contains all the details of testcases runned 
  <hr>
<h4>

 3. now use command  : <b>npm run generate-test-log </b>
</h4>
  <br>
  this command generate a txt file which is <b>user readable</b> from result.json 
  after this command a separate folder name <b>testresult</b> is generated which conains <b>TestLog.txt</b>

<hr>
<h2>#Snapshot OF testCase Exectuion</h2>


![image](https://github.com/user-attachments/assets/98a0bae6-6396-4b7f-a9e1-d2e61f90482f)

<h2>#Snapshot of File Which Is genreated After TestCase Exectuion</h2>
<h3>
  Folder
</h3>

![image](https://github.com/user-attachments/assets/f342df6b-8846-47ec-88b3-d0ba76e3b4cc)

<h3>TestLog.txt File</h3>



![image](https://github.com/user-attachments/assets/cded5a0d-d6e2-4b09-b3ad-5390f2e47e89)



## Benefits of Test-Driven Development (TDD)

The TDD approach offers several advantages:

- Ensures continuous testing, reducing the introduction of bugs or regressions.
- Acts as living documentation, showcasing code usage and expected behavior.
- Provides immediate feedback, allowing developers to catch errors early in the development process.

With TDD, we create a multitude of test cases, ensuring the program's accuracy and reliability as it evolves.



