# Copilot & Sons: El7a2ny Pharmacy

[![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=40&pause=1000&color=F7187F&center=true&vCenter=true&random=false&width=1000&height=200&lines=Welcome+to+Copilot+%26+Sons%3A+El7a2ni!!+%F0%9F%98%B1)](https://git.io/typing-svg)

## Table of Contents

1. [🚀 Motivation](#-motivation)
2. [🧱 Build Status](#-build-status)
3. [🎨 Code Style](#-code-style)
4. [🎥 Screenshots & Video](#-screenshots--video)
5. [⚒️ Tech and Framework used](#-tech-and-framework-used)
6. [🔥 Features](#-features)
7. [💻 Code Examples](#-code-examples)
8. [🪛 Installation](#-installation)
9. [📚 API Reference](#-api-reference)
10. [🧪 Tests](#-tests)
11. [🧑🏻‍🏫 How to Use](#-how-to-use)
12. [🤝 Contribute](#-contribute)
13. [🫡 Credits](#-credits)
14. [📜 License](#-license)

## 🚀 Motivation

Welcome to Copilot & Sons El7a2ny Pharmacy, a state-of-the-art integrated pharmacy management software. This project is motivated by the desire to streamline and automate pharmacy operations, providing a seamless experience for pharmacists and patients within the healthcare ecosystem.

## 🧱 Build Status

![example workflow](https://github.com/Advanced-Computer-Lab-2023/Copilot-and-Sons-Pharmacy/actions/workflows/compile.yml/badge.svg)
![example workflow](https://github.com/Advanced-Computer-Lab-2023/Copilot-and-Sons-Pharmacy/actions/workflows/lint.yml/badge.svg)

- This project is under development and should not be used in a production settings
- Check **Issues** for a list of all the reported issues
- More automated tests should be added in the future
- More documentation should be added

## 🎨 Code Style

We use [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) to enforce a consistent code style. We use an edited version of the default ESLint TypeScript config. You can check the config in the [.eslintrc.js](.eslintrc.js) file.

<details>
<summary>Useful Commands</summary>

### Useful Commands

- Check formatting using Prettier

```bash
npm run format
```

- And then fix formatting using Prettier

```bash
npm run format:fix
```

- Check linting using ESLint

```bash
npm run lint
```

- And then fix linting using ESLint

```bash
npm run lint:fix
```

- Check compilation of all subpackages using TypeScript

```bash
npm run compile:all
```

</details>

## 🎥 Screenshots & Video

## ⚒️ Tech and Framework used

- [NodeJs](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [ReactJs](https://reactjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [MUI](https://mui.com/)
- [React Router](https://reactrouter.com/)
- [React Hook Form](https://react-hook-form.com/)
- [React Query](https://react-query.tanstack.com/)
- [Formik](https://formik.org/)
- [Toastify](https://fkhadra.github.io/react-toastify/introduction)
- [Socket.io](https://socket.io/)
- [Firebase Storage](https://firebase.google.com/docs/storage)
- [NodeMailer](https://nodemailer.com/about/)
- [JsonWebToken](https://jwt.io/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Postman](https://www.postman.com/)

## 🔥 Features

## 💻 Code Examples

<details>
<summary>BE Routes</summary>

```js
app.use('/api/medicine', medicinesRoute)
app.use('/api/patient', patientsRoute)
app.use('/api/admin', adminsRoute)
app.use('/api/pharmacist', pharmacistRoute)
app.use('/api/cart', cartsRoute)
app.use('/api/debug', debugRouter)
app.use('/api', authRouter)
app.use('/api', deliveryAddressRouter)
app.use('/api/order', orderRouter)
app.use('/api', chatsRouter)
app.use('/api', notificationRouter)
app.use('/api', chatsRouter)
```

</details>

<details>
<summary>BE Cart Controller</summary>

```js

export const addToCart = asyncWrapper(async (req: Request, res: Response) => {
  const cart = await addToCartService(req.body, req.username)
  res.json({ success: SUCCESS, data: cart })
})

export const viewCart = asyncWrapper(async (req: Request, res: Response) => {
  const cartItems = await viewCartService(req.username)
  res.json({ success: SUCCESS, data: cartItems })
})

export const removeItemFromCart = asyncWrapper(
  async (req: Request, res: Response) => {
    const cart = await removeItemFromCartService(
      req.query.medicineId,
      req.username
    )
    res.json({ success: SUCCESS, data: cart })
  }
)

export const ClearAllItemsFromCart = asyncWrapper(
  async (req: Request, res: Response) => {
    const cart = await ClearCartService(req.username)
    res.json({ success: SUCCESS, data: cart })
  }
)

export const changeCartItemQuantity = asyncWrapper(
  async (req: Request, res: Response) => {
    const cart = await changeCartItemQuantityService(req.body, req.username)
    res.json({ success: SUCCESS, data: cart })
  }
)

export const addPrescriptiontoCart = asyncWrapper(
  async (req: Request, res: Response) => {
    const cart = await addPrescriptiontoCartService(
      req.body.prescriptionId,
      req.username
    )
    res.json({ success: SUCCESS, data: cart })
  }
)
```

</details>

<details>
<summary>BE Clear Cart Service</summary>

```js

export async function ClearCartService(username: any) {
  const patientUser = await userModel.findOne({ username })
  const user = await Patient.findOne({ user: patientUser?._id })

  const cart = await CartModel.findOne({ _id: user?.cart })

  if (!cart) {
    return null
  }

  cart.items.forEach(async (cartItem) => {
    if (cartItem.byPrescription !== null) {
      await PrescriptionModel.updateOne(
        { _id: cartItem.byPrescription },
        { $set: { isFilled: false } }
      )
    }
  })

  cart.items = []
  const updatedCart = await cart.save()

  return updatedCart
}

```

</details>

<details>
<summary>BE Cart Model</summary>

```js
interface ICartItem {
  medicine: IMedicine
  quantity: number
  byPrescription: PrescriptionDocument | null
}

const cartItemSchema = new Schema<ICartItem>({
  medicine: { type: Schema.Types.ObjectId, ref: 'Medicine' },
  quantity: Number,
  byPrescription: {
    type: Schema.Types.ObjectId,
    ref: 'Prescription',
    default: null,
  },
})

export interface ICart extends Document {
  items: Array<{
    medicine: IMedicine
    quantity: number
    byPrescription: PrescriptionDocument | null
  }>
}

const cartSchema = new Schema<ICart>({
  items: [cartItemSchema],
})

export const CartModel: Model<ICart> = model('Cart', cartSchema)
```

</details>

<details>
<summary>BE Admin Validator</summary>

```js
const adminValidator = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    'string.base': 'Username should be a string',
    'string.alphanum': 'Username should only contain alphanumeric characters',
    'string.min': 'Username should have a minimum length of {#limit}',
    'string.max': 'Username should have a maximum length of {#limit}',
    'any.required': 'Username is required',
  }),

  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email address',
    'any.required': 'Email is required',
  }),

  password: Joi.string()
    .min(8)
    .required()
    .custom((value) => {
      if (!isStrongPassword(value)) {
        const errorReason = getPasswordStrengthReason(value)
        throw new AppError(errorReason, 400, ERROR) // Throw a custom error message
      }

      return value
    })
    .messages({
      'string.min': 'Password should have a minimum length of {#limit}',
      'any.required': 'Password is required',
    }),
})
```

</details>

<details>
<summary>FE Admin Routes</summary>

```js

export const adminDashboardRoutes: RouteObject[] = [
  {
    element: <AdminDashboardLayout />,
    children: [
      {
        path: '',
        element: <AdminDashboardHome />,
      },
      {
        path: 'change-password',
        element: <ChangePassword />,
      },
      {
        path: 'add-admin',
        element: <AddingAdmin />,
      },
      {
        path: 'remove-user',
        element: <RemoveUser />,
      },
      {
        path: 'get-approved-pharmacists',
        element: <GetApprovedPharmacists />,
      },
      {
        path: 'get-pending-pharmacists',
        element: <GetPharmacists />,
      },
      {
        path: 'medicines',
        children: [
          {
            path: '',
            element: <ViewAllMedicines />,
          },
          {
            path: 'search-for-medicine',
            element: <SearchForMedicine />,
          },
          {
            path: 'allUses',
            element: <MedicinalUses />,
          },
          {
            path: 'allUses/:name',
            element: <FilteredMedicines />,
          },
        ],
      },
      {
        path: 'viewPatients',
        element: <ViewPatients />,
      },
      {
        path: 'viewPatients/info/:id',
        element: <PatientInfo />,
      },
      {
        path: 'sales-and-quantity',
        element: <ViewMedicineSalesAndQuantity />,
      },
      {
        path: 'clinic',
        element: <RedirectToClinic />,
      },
    ],
  },
]
```

</details>

<details>
<summary>FE Login Page</summary>

```js

export const Login = () => {
  const { refreshUser } = useAuth()

  return (
    <>
      <ApiForm<LoginRequest>
        fields={[
          { label: 'Username', property: 'username' },
          { label: 'Password', property: 'password' },
        ]}
        validator={LoginRequestValidator}
        successMessage="Logged in successfully."
        action={login}
        onSuccess={() => refreshUser()}
        buttonText="Login"
      />
      <Link to={'/forgot-password'}>forgot your password?</Link>
      <br />
      <Link to={'../register-request'}>SIGN UP</Link>
    </>
  )
}

```

</details>

## 🪛 Installation

- Make sure you have [Node](https://nodejs.org/en) and [Git](https://git-scm.com/) installed

- Make a new folder for the sub system of Clinic & Pharmacy

```bash
mkdir Copilot-and-Sons
cd Copilot-and-Sons
```

- Clone this repo + pharmacy repo

```bash
git clone https://github.com/advanced-computer-lab-2023/Copilot-and-Sons-Clinic
git clone https://github.com/advanced-computer-lab-2023/Copilot-and-Sons-Pharmacy
```

- Install dependencies for clinic

```bash
cd Copilot-and-Sons-Clinic
npm install
```

- Install dependencies for pharmacy

```bash
cd ../Copilot-and-Sons-Pharmacy
npm install
```

## 📚 API Reference

> **Note**
>
> - All responses are wrapped in `{ status: 'success' | 'error', data: <The response data> }`
> - All endpoints are prefixed by `/api/<The URI>`

<details>
<summary>Admin Endpoints</summary>

- `POST /admin/add-admin` - Add a new admin
  - **Request Body**
    ```
    {
        username: string
        password: string
        email: string
    }
    ```
  - **Response Body**:
    ```
    user: {
        username: string
        password: string
        email: string
    }
    ```
- `DELETE /admin/removeUser` - Delete a user by username
  - **Request Body**
    ```
        {
            data: {
                username: string
            }
        }
    ```
  - **Response Body**: N/A
- `GET /admin/getPendingPharmacists` - Get pending pharmacists
  - **Request Body**: N/A
  - **Response Body**:
    ```
    {
        user: {
            username: string
            password: string
            type: UserType
        },
        name: string,
        email: string,
        dateOfBirth: Date,
        hourlyRate: number,
        affilation: string,
        status: 'Accepted' | 'Pending' | 'Rejected',
        educationalBackground: {
            major: string,
            university: string,
            graduationYear: number,
            degree: 'Associate degree' | "Bachelor's degree" | Master's degree", |'Doctoral degree',,
        },
        documents: [string],
        walletMoney: number,
    }
    ```
- `GET admin/getAcceptedPharmacists` - Get accepted pharmacists
  - **Request Body**: N/A
  - **Response Body**:
    ```
    {
        user: {
            username: string
            password: string
            type: UserType
        },
        name: string,
        email: string,
        dateOfBirth: Date,
        hourlyRate: number,
        affilation: string,
        status: 'Accepted' | 'Pending' | 'Rejected',
        educationalBackground: {
            major: string,
            university: string,
            graduationYear: number,
            degree: 'Associate degree' | "Bachelor's degree" | Master's degree", |'Doctoral degree',,
        },
        documents: [string],
        walletMoney: number,
    }
    ```

</details>

<details>
<summary>Auth Endpoints</summary>

- `POST /patient/register` - Register patient

  - **Request Body**
    ```
    {
        username: string
        name: string
        email: string
        password: string
        dateOfBirth: string | null
        gender: string
        mobileNumber: string
        emergencyContact: {
            fullName: string
            mobileNumber: string
            relation: string
        }
    }
    ```
  - **Response Body**:
    ```
    {
        token: string // The jwt token
    }
    ```

- `POST /auth/login` - Authenticate a user and retrieve an access token.

  - **Request Body:**

  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```

  - **Response Body:**

  ```json
  {
    "token": "string"
  }
  ```

- `GET /auth/me` - Retrieve information about the currently authenticated user.

- **Response Body:**

  ```json
  {
    "id": "string",
    "username": "string",
    "name": "string",
    "email": "string",
    "dateOfBirth": "string",
    "gender": "string",
    "mobileNumber": "string",
    "emergencyContact": {
      "fullName": "string",
      "mobileNumber": "string"
    }
  }
  ```

- `POST /patient/requestOtp` - Request to send OTP for forgetting password

  - **Request Body:**

  ```
  {
      email: string
  }
  ```

  - **Response Body:**: N/A

- `POST /patient/verifyOtp` - Verify OTP for forgetting password

  - **Request Body:**

  ```
  {
      email: string,
      otp: string,
  }
  ```

  - **Response Body:**: N/A

- `POST /patient/updatePassword` - Update patient password after forgetting password

      - **Request Body:**
      ```
      {
          email: string,
          newPassword: string
      }
      ```

      - **Response Body:**: N/A

  </details>

<details>
<summary>Cart Endpoints</summary>

- `POST /cart/add` - Add item to shopping cart

  - **Request Body**
    ```
    { medicineId: string, quantity: string }
    ```
  - **Response Body**:
    ```
    {
        items: [
            {
                medicine: {
                    name: string,
                    price: string,
                    description: string,
                    quantity: number,
                    Image: string,
                    activeIngredients: [string],
                    medicinalUse: [string],
                    sales: number,
                    requiresPrescription: boolean,
                    status: string,
                    discountedPrice: number
                },
                quantity:  number,
                byPrescription: boolean
            }
        ]
    }
    ```

- `GET /cart/view` - View cart items for current user

  - **Request Body**: N/A
  - **Response Body**:
    ```
    {
        items: [
            {
                medicine: {
                    name: string,
                    price: string,
                    description: string,
                    quantity: number,
                    Image: string,
                    activeIngredients: [string],
                    medicinalUse: [string],
                    sales: number,
                    requiresPrescription: boolean,
                    status: string,
                    discountedPrice: number
                },
                quantity:  number,
                byPrescription: boolean
            }
        ]
    }
    ```

- `DELETE /cart/remove` - Delete item from the cart

  - **Request Body**:
    ```
    { medicineId: string }
    ```
  - **Response Body**:
    ```
    {
        items: [
            {
                medicine: {
                    name: string,
                    price: string,
                    description: string,
                    quantity: number,
                    Image: string,
                    activeIngredients: [string],
                    medicinalUse: [string],
                    sales: number,
                    requiresPrescription: boolean,
                    status: string,
                    discountedPrice: number
                },
                quantity:  number,
                byPrescription: boolean
            }
        ]
    }
    ```

- `PUT /cart/change-quantity` - Change quantity of item in cart

  - **Request Body**:
    ```
    { medicineId: string, quantity: number }
    ```
  - **Response Body**:
    ```
    {
        items: [
            {
                medicine: {
                    name: string,
                    price: string,
                    description: string,
                    quantity: number,
                    Image: string,
                    activeIngredients: [string],
                    medicinalUse: [string],
                    sales: number,
                    requiresPrescription: boolean,
                    status: string,
                    discountedPrice: number
                },
                quantity:  number,
                byPrescription: boolean
            }
        ]
    }
    ```

- `POST /cart/clear` - Clear cart items
  - **Request Body**: N/A
  - **Response Body**:
  `    {
    items: [
        {
            medicine: {
                name: string,
                price: string,
                description: string,
                quantity: number,
                Image: string,
                activeIngredients: [string],
                medicinalUse: [string],
                sales: number,
                requiresPrescription: boolean,
                status: string,
                discountedPrice: number
            },
            quantity:  number,
            byPrescription: boolean
        }
    ]
}`
  </details>

<details>
<summary>Medicine Endpoints</summary>

- `GET /medicine` - Get all medicines

  - **Request Body**: N/A
  - **Response Body**:
    ```
    [
      {
          name: string,
          price: string,
          description: string,
          quantity: number,
          Image: string,
          activeIngredients: [string],
          medicinalUse: [string],
          sales: number,
          requiresPrescription: boolean,
          status: string,
          discountedPrice: number
      }
    ]
    ```

- `GET /medicine/unarchivedMedicines` - Get all unarchived medicines

  - **Request Body**: N/A
  - **Response Body**:
    ```
    [
      {
          name: string,
          price: string,
          description: string,
          quantity: number,
          Image: string,
          activeIngredients: [string],
          medicinalUse: [string],
          sales: number,
          requiresPrescription: boolean,
          status: string,
          discountedPrice: number
      }
    ]
    ```

- `PATCH /medicine/archiveMedicine/:name` - Archive a medice by name

  - **Request Body**: N/A
  - **Response Body**: N/A

- `PATCH /medicine/unarchiveMedicine/:name` - Unarchive a medice by name
  - **Request Body**: N/A
  - **Response Body**: N/A
- `GET /medicine/viewAlternatives/:id` - Get all alternatives of a medicine by id
  - **Request Body**: N/A
  - **Response Body**:
    ```
    [
      {
          name: string,
          price: string,
          description: string,
          quantity: number,
          Image: string,
          activeIngredients: [string],
          medicinalUse: [string],
          sales: number,
          requiresPrescription: boolean,
          status: string,
          discountedPrice: number
      }
    ]
    ```
- `GET /medicine/quantity-sales/:id` - Get quantity & sales of a medicine
  - **Request Body**: N/A
  - **Response Body**:
    ```
    {
        name: string,
        quantity: number,
        sales: number,
    }
    ```
- `GET /medicine/salesReportByMonth?month={month}` - Get sales of a medicine by month
  - **Request Body**: N/A
  - **Response Body**:
    ```
    {
        name: string,
        sales: number,
    }
    ```
- `GET /medicine/salesReportByMonth?date={date}` - Get sales of a medicine by date
  - **Request Body**: N/A
  - **Response Body**:
    ```
    {
        name: string,
        sales: number,
    }
    ```
- `POST /medicine/addMedicine` - Add a new medicine

  - **Request Body**:

  ```
  {
    name: string,
    price: number,
    description: string,
    quantity: number,
    Image: File,
    mainActiveIngredient: string,
    activeIngredients: string,
    medicinalUse: string,
    sales: number,
    needPrescription: boolean,
  }
  ```

  - **Response Body**:
    ```
    {
        name: string,
        price: string,
        description: string,
        quantity: number,
        Image: string,
        activeIngredients: [string],
        medicinalUse: [string],
        sales: number,
        requiresPrescription: boolean,
        status: string,
    }
    ```

- `GET /admin/getMedicineByName/:name` - Get a medicine by its name

  - **Request Body**: N/A
  - **Response Body**:
    ```
    [
      {
          name: string,
          price: string,
          description: string,
          quantity: number,
          Image: string,
          activeIngredients: [string],
          medicinalUse: [string],
          sales: number,
          requiresPrescription: boolean,
          status: string,
          discountedPrice: number
      }
    ]
    ```

- `GET /admin/getMedicineByName/:name` - Get a medicine by its name

  - **Request Body**: N/A
  - **Response Body**:
    ```
    [
      {
          name: string,
          price: string,
          description: string,
          quantity: number,
          Image: string,
          activeIngredients: [string],
          medicinalUse: [string],
          sales: number,
          requiresPrescription: boolean,
          status: string,
          discountedPrice: number
      }
    ]
    ```

- `GET /medicine/allMedicinalUses` - Get all use cases

  - **Request Body**: N/A
  - **Response Body**: `[string]`

- `GET /medicine/filterByMedicinalUse/:name` - Get all medicine for a usecase
  - **Request Body**: N/A
  - **Response Body**:
    ```
    [
      {
          name: string,
          price: string,
          description: string,
          quantity: number,
          Image: string,
          activeIngredients: [string],
          medicinalUse: [string],
          sales: number,
          requiresPrescription: boolean,
          status: string,
          discountedPrice: number
      }
    ]
    ```
- `PUT /medicine/wallet/:totalMoney` - Update patient wallet
  - **Request Body**: N/A
  - **Response Body**: `number` -> The new wallet amount
  </details>

<details>
<summary>Chat Endpoints</summary>

- `POST '/chats/get-all' - Get all chats for a user
  - **Request Body**:
  ```
  {
      'username': string // Could be username of a patient, doctor, or admin
  }
  ```
  - **Response Body**
  ```
  {
      'id': string
      'users': Array<{
          'id': string
          'username': string
          'name': string
          'email': string
          'type': UserType
      }>
      'createdAt': string
      'lastMessage': string
      'hasUnreadMessages': boolean
  }
  ```
- `POST /chats/create-or-get` - Creates a new chat or gets one if it already exists between the users
  - **Request Body**
    ```
    {
        'initiator': string
        'receiver': string
    }
    ```
  - **Reponse Body**: `string` -> ID of the created chat
- `POST /chats/get-by-id` - Gets a chat by its id

  - **Request Body**
    ```
    {
        'chatId': string
        'readerUsername': string
    }
    ```
  - **Reponse Body**
    ```
    {
        'id': string
        users: Array<{
            'id': string
            'username': string
            'name': string
            'email': string
            'type': UserType
        }>
        'messages': Array<{
            'id': string
            'sender': string
            'senderType': UserType
            'senderDetails': {
                'name': string
                'email': string
            }
            'content': string
            'createdAt': string
        }>
        'createdAt': string
        'lastMessage': string
        'hasUnreadMessages': boolean
    }
    ```

- `POST /chats/send-message` - Sends a message

  - **Request Body**
    ```
    {
        'chatId': string
        'senderUsername': string
        'content': string
    }
    ```
  - **Reponse Body**: N/A

- `POST '/chats/mark-as-read'` - Marks a chat as being read
  - **Request Body**
    ```
    {
        'chatId': string
        'username': string
    }
    ```
  - **Reponse Body**: N/A

</details>

<details>
<summary>Delivery Address Endpoints</summary>

- `GET '/patients/:username/delivery-addresses' - Get all delivery addresses of a user by username
  - **Request Body**: N/A
  - **Response Body**
  ```
  [
    {
        _id: string
        address: string
        city: string
        country: string
    }
  ]
  ```
- `POST /patients/:username/delivery-addresses` - Create a new delivery address for a user
  - **Request Body**
    ```
    {
        address: string,
        city: string,
        country: string,
    }
    ```
  - **Reponse Body**:
    ```
    [
        {
            _id: string
            address: string
            city: string
            country: string
        }
    ]
    ```
- `DELETE /patients/:patientUsername/delivery-addresses/:deliveryAddressId` - Delete delivery address by id and username of patient

  - **Request Body**: N/A
  - **Reponse Body**: N/A

- `PUT /patients/:patientUsername/delivery-addresses/:deliveryAddressId` - Update delivery address
  - **Request Body**
    ```
    {
        address: string,
        city: string,
        country: string,
    }
    ```
  - **Reponse Body**:
  ```
  [
      {
          _id: string
          address: string
          city: string
          country: string
      }
  ]
  ```
  </details>

<details>
<summary>Notifications Endpoints</summary>

- `POST /notifications/all'` - Get all notifications for a user

  - **Request Body**:
    ```
    {
        'username': string,
    }
    ```
  - **Reponse Body**:
    ```
    {
        notifications: [
            {
                _id: string
                title: string
                description?: string
            }
        ]
    }
    ```

- `DELETE /notifications'` - Delete a notification
  - **Request Body**:
  ```
  {
    username: string,
    notificationId: string,
  }
  ```
  - **Reponse Body**: N/A

</details>

<details>
<summary>Orders Endpoints</summary>

- `POST /order/addOrder'` - Add an order

  - **Request Body**:
    ```
    {
      patientID: string,
      total: number,
      date: string,
      address: string,
      paymentMethod: 'wallet' | 'cash' | 'credit-card'
    }
    ```
  - **Reponse Body**:

    ```
    {
      patientID: string,
      total: number,
      date: Date,
      status: 'pending' | 'delivered' | 'cancelled'
      cartID: string,
      paymentMethod: string,

      address: {
        address: string,
        city: string,
        country: string,
      },
    }
    ```

- `GET /order/orders'` - Get all orders of current patient

  - **Request Body**: N/A
  - **Reponse Body**:

    ```
    [
      {
        patientID: string,
        total: number,
        date: Date,
        status: 'pending' | 'delivered' | 'cancelled'
        cartID: string,
        paymentMethod: string,

        address: {
          address: string,
          city: string,
          country: string,
        },
      }
    ]
    ```

- `GET /order/viewOrder/${id}` - Get details about order by id

  - **Request Body**: N/A
  - **Reponse Body**:

    ```
    {
      patientID: string,
      total: number,
      date: Date,
      status: 'pending' | 'delivered' | 'cancelled'
      cartID: string,
      paymentMethod: string,

      address: {
        address: string,
        city: string,
        country: string,
      },
    }
    ```

- `GET /order/cancelOrder/:id` - Cancel order by id
  - **Request Body**: N/A
  - **Reponse Body**: N/A

</details>

<details>
<summary>Patient Endpoints</summary>

- `GET /patient/viewAllPatients'` - View all patients
  - **Request Body**: N/A
  - **Reponse Body**:
    ```
    {
      user: string,
      name: string,
      email: string,
      mobileNumber: string,
      dateOfBirth: Date,
      gender: 'Male' | 'Female',
      emergencyContact: {
        fullName: string,
        mobileNumber: string,
        relation: string,
      },
      orders: [string],
      cart: string,
      deliveryAddresses: [
        {
          address: string,
          city: string,
          country: string,
        },
      ],
      walletMoney: number,
      familyMembers: [string],
      documents: [string],
      healthPackage: string,
      healthPackageRenewalDate: Date,
      notes: [string],
      healthRecords: [string],
      healthPackageHistory: [
        {
          healthPackage: string,
          date: Date,
        },
      ]
    }
    ```
- `POST /patient/requestOtp'` - Request OTP to reset password
  - **Request Body**:
    ```
      {email: string}
    ```
  - **Reponse Body**: N/A
- `GET /admin/patientInfo/:id` - Get info about patient by id

  - **Request Body**: N/A
  - **Reponse Body**:
    ```
    {
      user: string,
      name: string,
      email: string,
      mobileNumber: string,
      dateOfBirth: Date,
      gender: 'Male' | 'Female',
      emergencyContact: {
        fullName: string,
        mobileNumber: string,
        relation: string,
      },
      orders: [string],
      cart: string,
      deliveryAddresses: [
        {
          address: string,
          city: string,
          country: string,
        },
      ],
      walletMoney: number,
      familyMembers: [string],
      documents: [string],
      healthPackage: string,
      healthPackageRenewalDate: Date,
      notes: [string],
      healthRecords: [string],
      healthPackageHistory: [
        {
          healthPackage: string,
          date: Date,
        },
      ]
    }
    ```

- `POST /cart/addPrescriptiontoCart` - Add prescription to cart
  - **Request Body**:
    ```
    { prescriptionId: string }
    ```
  - **Reponse Body**: N/A

</details>

<details>
<summary>Pharmacist Endpoints</summary>

- `GET /pharmacist/acceptPharmacistRequest/:id` - Accept a pharmacist request by id

  - **Request Body**: N/A
  - **Reponse Body**: N/A

- `GET /pharmacist/rejectPharmacistRequest/:id` - Reject a pharmacist request by id
  - **Request Body**: N/A
  - **Reponse Body**: N/A
- `GET /pharmacist/getPharmacist/:username` - Get a pharmacist by username

  - **Request Body**: N/A
  - **Reponse Body**:

  ```
    {
        user: {
            username: string
            password: string
            type: UserType
        },
        name: string,
        email: string,
        dateOfBirth: Date,
        hourlyRate: number,
        affilation: string,
        status: 'Accepted' | 'Pending' | 'Rejected',
        educationalBackground: {
            major: string,
            university: string,
            graduationYear: number,
            degree: 'Associate degree' | "Bachelor's degree" | Master's degree", |'Doctoral degree',,
        },
        documents: [string],
        walletMoney: number,
    }
  ```

- `POST /pharmacist/addPharmacist` - Request to register as a pharmacist

  - **Request Body**:

  ```
    {
      'name': string,
      'email': string,
      'username': string,
      'password': string,
      'dateOfBirth': Date,
      'hourlyRate': number,
      'affilation': string,
      'educationalBackground': {
        'major': string,
        'university': string,
        'graduationYear': string,
        'degree': string,
      }
      'status': string',
      'documents': File[],
    }
  ```

  - **Reponse Body**:

  ```
    {token: string} // The jwt token
  ```

- `PATCH /pharmacist/depositSalary/:id` - Deposit a salary to the pharmacist by id
  - **Request Body**: N/A
  - **Reponse Body**: N/A
  </details>

## 🧪 Tests

## 🧑🏻‍🏫 How to Use

- Make sure to follow the [Installation](#-installation) steps first

- Add a `.env` in the `backend` of both repos `Copilot-and-Sons-Clinic` and `Copilot-and-Sons-Pharmacy` with the following variables (replace the values with your own)

```bash
MONGO_URI="<Your Mongo Connection String>"
PORT=3000
BCRYPT_SALT="<A secret string to use for encrypting passwords>"
JWT_TOKEN="<A secret string to use for hashing JWT tokens>"
```

- Start clinic

```bash
cd Copilot-and-Sons-Clinic
npm start
```

- Start pharmacy in a different terminal

```bash
cd Copilot-and-Sons-Pharmacy
npm start
```

> **NOTE**
>
> If you want to use Docker Compose to start to project, you can replace the last step with `docker compose up`

## 🤝 Contribute

We welcome contributions to Copilot&Sons El7a2ny Clinic. If you want to contribute, it's as easy as:

1. Fork the repo
2. Create a new branch (`git checkout -b my-new-feature`)
3. Make changes
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Push to the branch (`git push origin my-new-feature`)
6. Create a new Pull Request
7. Wait for your PR to be reviewed and merged

> **NOTE**
>
> We welcome all contributions, but please make sure to follow our code style and linting rules. You can check the [Code Style](#-code-style) section for more details.

## 🫡 Credits

### Docs

- [Mongoose docs](https://mongoosejs.com/docs/)
- [Express docs](https://expressjs.com/en/4x/api.html)
- [ReactJs docs](https://reactjs.org/docs/getting-started.html)
- [NodeJs docs](https://nodejs.org/en/docs/)
- [TypeScript docs](https://www.typescriptlang.org/docs/)
- [Docker docs](https://docs.docker.com/)
- [Docker Compose docs](https://docs.docker.com/compose/)
- [ESLint docs](https://eslint.org/docs/user-guide/getting-started)
- [Prettier docs](https://prettier.io/docs/en/index.html)
- [MUI docs](https://mui.com/getting-started/usage/)
- [React Router docs](https://reactrouter.com/en/6.21.0)
- [React Hook Form docs](https://react-hook-form.com/get-started)
- [React Query docs](https://react-query.tanstack.com/overview)
- [Formik docs](https://formik.org/docs/overview)
- [Toastify docs](https://fkhadra.github.io/react-toastify/introduction)

### YouTube Videos

- [Mongoose Crash Course](https://www.youtube.com/watch?v=DZBGEVgL2eE)
- [Express Crash Course](https://www.youtube.com/watch?v=SccSCuHhOw0)
- [ReactJs Crash Course](https://www.youtube.com/watch?v=w7ejDZ8SWv8)
- [MUI Crash Course](https://www.youtube.com/watch?v=vyJU9efvUtQ)
- [React Router Crash Course](https://www.youtube.com/watch?v=Law7wfdg_ls)
- [React Hook Form Crash Course](https://www.youtube.com/watch?v=-mFXqOaqgZk)
- [React Query Crash Course](https://www.youtube.com/watch?v=seU46c6Jz7E)

## 📜 License

The software is open source under the `Apache 2.0 License`.

[Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)
