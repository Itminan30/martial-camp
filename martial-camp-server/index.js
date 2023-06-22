const express = require('express');
const cors = require('cors');
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

const verifyJwt = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).send({ error: true, message: "unauthorized access" })
    }
    const token = authorization.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: true, message: "unauthorized access" })
        }
        req.decoded = decoded;
        next();
    })
}

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.24rypvm.mongodb.net/?retryWrites=true&w=majority`;

app.get("/", (req, res) => {
    res.send("Martial camp Server Runnning Successfully")
})

// Mongodb

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        // Send a ping to confirm a successful connection

        // collections
        const userCollection = client.db("martialDB").collection("users");
        const classCollection = client.db("martialDB").collection("classes");
        const cartCollection = client.db("martialDB").collection("cart");
        // collections

        // jwt
        app.post("/jwt", (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' });
            res.send({ token });
        })

        // verify admin
        const verifyAdmin = async (req, res, next) => {
            const decodedEmail = req.decoded.email;
            const query = { email: decodedEmail };
            const user = await userCollection.findOne(query);
            if (user?.role !== "admin") {
                return res.status(403).send({ error: true, message: "forbidden access" })
            }
            next();
        }

        // User methods -----------------------------------------------------------------------------------------------

        // get all instructor info
        app.get("/instructors", async (req, res) => {
            const result = await userCollection.find({ role: "instructor" }).toArray();
            res.send(result);
        })

        // check if user is admin
        app.get("/user/role/:email", verifyJwt, async (req, res) => {
            const email = req.params.email;
            const userEmail = req.decoded.email;
            // console.log(email, userEmail);
            if (email !== userEmail) {
                return res.status(401).send({ error: true, message: "forbidden access" })
            }
            const query = { email: email };
            const user = await userCollection.findOne(query);
            const result = { userRole: user?.role };
            res.send(result);
        })

        // get all user info
        app.get("/user", verifyJwt, verifyAdmin, async (req, res) => {
            const email = req.query.email;
            const userEmail = req.decoded.email;
            if (email !== userEmail) {
                return res.status(401).send({ error: true, message: "forbidden access" })
            }
            const result = await userCollection.find({}).toArray();
            res.send(result);
        })

        // add user to db
        app.patch("/user", async (req, res) => {
            const user = req.body;
            const query = { email: user.email }
            const checkEmail = await userCollection.findOne(query);
            if (checkEmail) {
                return
            }
            else {
                const filter = { email: user.email };
                const options = { upsert: true };
                const updateDoc = {
                    $set: {
                        name: user.name,
                        email: user.email,
                        photo: user.photo,
                        role: "student"
                    }
                }
                const result = await userCollection.updateOne(filter, updateDoc, options);
                res.send(result);
            }
        })

        // make a user admin or instructor
        app.patch("/user/:id", async (req, res) => {
            const id = new ObjectId(req.params.id);
            const updatedRole = req.query.role;

            const filter = { _id: id };
            const updateDoc = {
                $set: {
                    role: updatedRole
                },
            };
            const result = await userCollection.updateOne(filter, updateDoc);
            res.send(result);
        })

        // User methods ------------------------------------------------------------------------------------


        // Instructor methods for instructor role ------------------------------------------------------------

        // get all approved classes
        app.get("/allapproved", async (req, res) => {
            const result = await classCollection.find({ status: "approve" }).toArray();
            res.send(result);
        })

        // get popular class
        app.get("/popularclass", async (req, res) => {
            const query = {status: "approve"};
            const option = {
                sort: {
                    enrolledCount: 1
                }
            }
            const result = await classCollection.find(query, option).toArray();
            res.send(result);
        })

        // get all class of all instructors
        app.get("/allclass", verifyJwt, verifyAdmin, async (req, res) => {
            const email = req.query.email;
            const userEmail = req.decoded.email;
            if (email !== userEmail) {
                return res.status(401).send({ error: true, message: "forbidden access" })
            }
            const result = await classCollection.find().toArray();
            res.send(result);
        })

        // method for getting all classes of an instructor from the database
        app.get("/myclass/:email", verifyJwt, async (req, res) => {
            const email = req.params.email;
            const decodedEmail = req.decoded.email;
            if (email !== decodedEmail) {
                return res.status(401).send({ error: true, message: "forbidden access" })
            }
            const query = { instructorEmail: email };
            const result = await classCollection.find(query).toArray();
            res.send(result);
        })

        // method for adding class to the database
        app.post("/addclass", verifyJwt, async (req, res) => {
            const addedClass = req.body;
            const email = req.body.instructorEmail;
            const decodedEmail = req.decoded.email;
            if (email !== decodedEmail) {
                return res.status(401).send({ error: true, message: "forbidden access" })
            }
            const result = await classCollection.insertOne(addedClass);
            res.send(result);
        })

        // method for updating a class
        app.patch("/updateclass/:id", verifyJwt, async (req, res) => {
            const id = req.params.id;
            const { price, availableSeat, photo, status } = req.body;
            const filter = { _id: new ObjectId(id) };
            const updatedDoc = {
                $set: {
                    price: price,
                    availableSeat: availableSeat,
                    photo: photo,
                    status: status
                }
            }
            const result = await classCollection.updateOne(filter, updatedDoc);
            res.send(result);
        })

        // method for updating class status and give feedback
        app.patch("/statuschange/:email", verifyJwt, verifyAdmin, async (req, res) => {
            const email = req.params.email;
            const decodedEmail = req.decoded.email;
            const id = req.body._id;
            if (email !== decodedEmail) {
                return res.status(401).send({ error: true, message: "forbidden access" })
            }
            const status = req.query.status;
            const feedback = req.query.feedback;
            const filter = { _id: new ObjectId(id) };
            if (status) {
                const updatedDoc = {
                    $set: {
                        status: status
                    }
                }
                const result = await classCollection.updateOne(filter, updatedDoc);
                res.send(result);
            }
            else if (feedback) {
                const updatedDoc = {
                    $set: {
                        feedback: feedback
                    }
                }
                const result = await classCollection.updateOne(filter, updatedDoc);
                res.send(result);
            }
        })

        // Instructor methods for instructor role ---------------------------------------------------------------------------------

        // Student related methods -------------------------------------------------------------------------------------------------

        // method for get from cart
        app.get("/getfromcart/:email", async(req, res) => {
            const email = req.params.email;
            const query = {studentEmail: email, payment: "due"};
            const result = await cartCollection.find(query).toArray();
            res.send(result);
        }) 

        // get class which are enrolled by user
        app.get("/enrolledclass/:email", async(req, res) => {
            const email = req.params.email;
            const query = {studentEmail: email, payment: "done"};
            const result = await cartCollection.find(query).toArray();
            res.send(result);
        }) 

        // method for add to cart
        app.post("/addtocart/:email", async (req, res) => {
            const email = req.params.email;
            const addedClass = {
                studentEmail: email,
                classId: req.body._id,
                name: req.body.name,
                photo: req.body.photo,
                instructorEmail: req.body.instructorEmail,
                price: req.body.price,
                payment: req.body.payment
            };
            const classCheck = await cartCollection.findOne({classId: req.body._id, studentEmail: email});
            if(classCheck){
                return;
            }
            const result = await cartCollection.insertOne(addedClass);
            res.send(result);
        })

        // handle payment
        app.patch("/buyfromcart/:id", async (req, res) => {
            const id = new ObjectId(req.params.id);
            const filter = {_id: id};
            const updatedDoc = {
                $set: {
                    payment: "done"
                }
            }
            const filterClass = {_id: new ObjectId(req.body.classId)}
            const buyedClass = await classCollection.findOne(filterClass);
            const availableSeat = buyedClass.availableSeat;
            const enrolledCount = buyedClass.enrolledCount;
            if(availableSeat > 0){
                const updatedClass = {
                    $set: {
                        availableSeat: availableSeat-1,
                        enrolledCount: enrolledCount+1
                    }
                }
                const classResult = await classCollection.updateOne(filterClass, updatedClass);
                const cartResult = await cartCollection.updateOne(filter, updatedDoc);
                res.send(cartResult);
            }
            else{
                return;
            }
            
        })

        // delete form cart
        app.delete("/deletefromcart/:id", async (req, res) => {
            const id = new ObjectId(req.params.id);
            const query = {_id: id};
            const result = await cartCollection.deleteOne(query);
            res.send(result);
        })

        // Student related methods -------------------------------------------------------------------------------------------------

        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

// Mongodb


app.listen(port, () => {
    console.log("Server running on port:", port);
})