import Barber from "../models/barberModel.js";
import Shop from "../models/shopModel.js";

export const addBarber = async (req, res) => {
  try {
    const { name, email, mobile_num,owner_id} = req.body;

    let barber = await Barber.findOne({email:email});
    let shop = await Shop.findOne({owner_id:owner_id});

    if(barber){
        res.json({
            stat: false,
            message: "Barber already Exist!",
          });
    }else{
        barber = await Barber.create({name:name, email:email,mobile_num:mobile_num});
        Shop.findByIdAndUpdate(shop._id,{$push:{barber_ids:barber._id}},{ "new": true, "upsert": true },
        function (err, managerparent) {
            if (err) throw err;
            console.log(managerparent);
        });
        res.json({
            stat: true,
            barber:barber,
            message: "Barber Added!",
          });
    }

    
    
  } catch (err) {
    res.json({ wentWrong: true, message: "Something went wrong !" });
    console.log(err.message);
  }
};
export const editBarber = async (req, res) => {
  try {
    const { _id , name, email, mobile_num} = req.body;

    let barber = await Barber.findOne({_id:_id});
    if(barber){
      await barber.set({name:name,email:email,mobile_num:mobile_num});
      await barber.save();
      res.json({
        stat: true,
        message: "success!",
      });
    }else{
      res.json({
        stat: false,
        message: "Barber not found!",
      });
    }
    
  } catch (err) {
    res.json({ wentWrong: true, message: "Something went wrong !" });
    console.log(err.message);
  }
};
export const deleteBarber = async (req, res) => {
  try {
    const { id,owner_id } = req.params;
    let shop = await Shop.findOne({owner_id:owner_id});
    console.log(id);
    await Barber.deleteOne({_id:id});
    Shop.findByIdAndUpdate(shop._id,{$pull:{barber_ids:id}},{ "new": true, "upsert": true },
        function (err, managerparent) {
            if (err) throw err;
            console.log(managerparent);
    });
    res.json({
      stat: true,
      message: "success!"
    })
    
  } catch (err) {
    res.json({ wentWrong: true, message: "Something went wrong !" });
    console.log(err.message);
  }
};

export const barberList = async (req, res) => {
    try {
      const { owner_id} = req.body;
      // console.log(owner_id);
      const shop = await Shop.findOne({owner_id:owner_id});
      // console.log(shop);
      let barberList = [];
      // console.log(shop.barber_ids);
    for(let i=0;i<shop.barber_ids.length;i++){
        // console.log(shop.barber_ids[i]);
        const barber = await Barber.findOne({_id:shop.barber_ids[i]});
        //  console.log(barber);
        barberList.push(barber);
        
    }
      // console.log(barberList);
      res.json({ stat: true, barbers: barberList, message: "Shop list." });
      
      
    } catch (err) {
      res.json({ wentWrong: true, message: "Something went wrong !" });
      console.log(err.message);
    }
  };