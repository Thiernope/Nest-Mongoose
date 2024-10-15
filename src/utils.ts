export const getCatWithOwnerObject = [
    {
      $lookup: {
        from: "owners",
        localField: "_id",
        foreignField: "cats",
        as: "owner"
      }
    }, 
    {
      $addFields: {
        owner: {
          $arrayElemAt: ["$owner", 0]
        },
      }
    },
    {
      $project: {
        _id: 1,
        name: 1,
        age: 1,
        owner: {
          _id: 1,
          name: 1,
          country: 1
        }
      }
    }
  ]