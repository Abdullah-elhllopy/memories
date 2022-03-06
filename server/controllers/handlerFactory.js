const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('../utils/apiFeatures')

exports.deleteOne = Model =>
  catchAsync( async (req , res, next)=>{
    const doc = await Model.findByIdAndDelete(req.params.id);
    // if there is no tour
    if(!doc){
      // next to run global middleware function
      return next(new AppError('No Tour Found With This ID ' ,404))
    }
    res.status(204).json({
      status : "success",
      data :null
    })
})


exports.updateOne = Model =>
    catchAsync( async (req , res ,next)=>{

      const doc=  await Model.findByIdAndUpdate(req.params.id , req.body , {
        new : true ,
        runValidators : true
      })

    // if there is no tour
    if(!doc){
      // next to run global middleware function
      return next(new AppError('No document Found With This ID ' ,404))
    }
      res.status(200).json({
          status : "success",
          data :{
            data : doc
          }
      })
  })
exports.getOne = (Model , popOptions) => catchAsync( async (req , res ,next)=>{

    let query = Model.findById(req.params.id)
    if (popOptions) query = query.populate(popOptions)
    const doc  = await query
    // if there is no tour
    if(!doc){
      // next to run global middleware function
      return next(new AppError('No Tour Found With This ID ' ,404))
    }
    res.status(200).json({
      status : "success",
      data :{
        data : doc
      }
    })
})
exports.getAll = Model => catchAsync( async (req , res ,next)=>{
  
  //this filter to allow get tour review 
  let filter = {}
  if(req.params.tourId) filter = {tour:req.params.tourId}

  const features = new APIFeatures(Model.find(filter) , req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()

  const doc = await features.query;

  res.status(200).json({
      status : "success",
      results : doc.length,
      data :{
         data : doc
     }
   })

})

exports.createOne = Model => catchAsync( async (req ,res ,next)=>{
  const doc =  await Model.create(req.body)
  res.status(201).json({
     status : 'success',
     data : {
        data : doc
     }
     })
})


exports.likeBlogPost = Model => catchAsync(async(req,res,next)=>{
    const {id} = req.params;
    const post = await Model.find({_id : id});
   
    if(!post){
        return next(new AppError('No document Found With This ID ' ,404))
      }
    const updatedBlogPost = await Model.findByIdAndUpdate(id,
        { likeCount: post[0].likeCount + 1 },
        { new: true }
      );
      
    
    if(!updatedBlogPost){
        return next(new AppError('No document Found With This ID ' ,404))
      } 
      res.status(200).json({
        status : "success",
        data :{
          data : updatedBlogPost
        }
    })
})