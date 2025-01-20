// init-replica.js

rs.initiate(
    rs.initiate(
        {
            _id: "rs0",
            members: [
                {
                    _id: 0,
                    host: "ec2-3-214-82-117.compute-1.amazonaws.com:27017"
                }
            ]
        },
        (err, res) => {
            if (err) {
                console.error("Failed to initiate replica set:", err);
            } else {
                console.log("Replica set initiated successfully:", res);
            }
        }
    )
)
