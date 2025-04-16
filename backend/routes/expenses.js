import express from 'express';
import Expense from '../models/Expense.js';
import { protect } from '../middleware/authMiddleware.js'; // JWT protection
import mongoose from 'mongoose';


const router = express.Router();

// Add new expense
router.post('/', protect, async (req, res) => {
    const { amount, category, description, date } = req.body;
   //console.log(req.body);
    try {
      const expense = new Expense({
        userId: req.user.id,
        amount,
        category,
        description,
        createdAt: date || new Date() 
      });
  
      const saved = await expense.save();
      res.status(201).json(saved);
    } catch (err) {
      res.status(500).json({ error: 'Failed to add expense' });
      console.log(err);
    }
  });
  

// Update an expense
router.put('/:id', protect, async (req, res) => {
  // Validate request body
  if (!req.body.amount || !req.body.category || !req.body.description) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const updated = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'Expense not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update expense' });
  }
});

//  Delete an expense
router.delete('/:id', protect, async (req, res) => {
  try {
    //console.log('id',req.params.id);
    const deleted = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });



    if (!deleted) return res.status(404).json({ error: 'Expense not found' });
    res.json({ message: 'Expense deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete expense' });
  }
});

// filtering by category and date
router.get('/', protect, async (req, res) => {
  try {
    const { category, startDate, endDate, sortBy, order } = req.query;

    // Build the filter object with userId from authenticated user
    let filter = { userId: req.user.id };

    // Filter by category if provided
    if (category) {
      filter.category = category;
    }

    // Filter by date range if provided
    if (startDate || endDate) {
      filter.createdAt = {};

      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0); // Start of the day
        filter.createdAt.$gte = start;
        console.log("Start Date:", start); // Log the start date
      }

      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999); // End of the day
        filter.createdAt.$lte = end;
        console.log("End Date:", end); // Log the end date
      }
    }

    // Determine the sorting field and order (default is ascending by amount)
    let sort = {};
    if (sortBy) {
      sort[sortBy] = order === 'desc' ? -1 : 1; // Ascending: 1, Descending: -1
    } else {
      // Default sorting: sort by createdAt in descending order
      sort.createdAt = -1; 
    }

    // Find and sort expenses that match the filter
    const expenses = await Expense.find(filter).sort(sort);

    if (expenses.length === 0) {
      return res.json({ error: 'No expenses found' });
    }

    res.json(expenses);
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});


   // try {
//       const { month, year } = req.query;
  
//       // Ensure year and month are valid numbers
//       const parsedYear = parseInt(year, 10);
//       const parsedMonth = parseInt(month, 10);
  
//       // Log for debugging
//       console.log('Year:', parsedYear);
//       console.log('Month:', parsedMonth);
  
//       // Check if year and month are valid
//       if (isNaN(parsedYear) || isNaN(parsedMonth)) {
//         return res.status(400).json({ error: 'Invalid year or month' });
//       }
  
//       // Validate month range (1-12)
//       if (parsedMonth < 1 || parsedMonth > 12) {
//         return res.status(400).json({ error: 'Month must be between 1 and 12' });
//       }
  
//       // Construct the start date of the selected month (startDate)
//       const startDate = new Date(Date.UTC(parsedYear, parsedMonth - 1, 1, 0, 0, 0, 0)); // Month is 0-indexed
//       console.log('Start Date:', startDate);
  
//       // Construct the end date of the selected month (endDate)
//       const endDate = new Date(Date.UTC(parsedYear, parsedMonth, 0, 23, 59, 59, 999)); // Last day of the month
//       console.log('End Date:', endDate);
  
//       // Check if the dates are valid
//       if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
//         return res.status(400).json({ error: 'Invalid date range' });
//       }
  
//       // Fetch the expense summary for the selected month and year
//       const summary = await Expense.aggregate([
//         {
//           $match: {
//             //userId:ObjectId("67f0075f3ad6e0e9529ffa0b"),
//             userId: new mongoose.Types.ObjectId(req.user.id),
//             createdAt: { $gte: startDate, $lte: endDate }
//           }
//         },
//         {
//           $group: {
//             _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
//             totalAmount: { $sum: "$amount" }
//           }
//         },
//         {
//           $sort: { "_id.month": 1 } // Sort by month
//         }
//       ]);

//       console.log('summery:', summary);
  
//       // If no expenses found, return a message
//       if (summary.length === 0) {
//         return res.status(404).json({ message: 'No expenses found for the selected month and year' });
//       }
  
//       // Send the expense summary as the response
//       res.json(summary);
//     } catch (err) {
//       console.error(err); // Log the error for debugging
//       res.status(500).json({ error: 'Failed to fetch monthly summary' });
//     }
//   });

router.get('/monthlySummary', protect, async (req, res) => {
    try {
      const { month, year } = req.query;
      const currentDate = new Date();
      const parsedYear = year ? parseInt(year, 10) : currentDate.getFullYear();
      const parsedMonth = month ? parseInt(month, 10) : currentDate.getMonth() + 1;
  
      if (isNaN(parsedYear) || isNaN(parsedMonth)) {
        return res.status(400).json({ error: 'Invalid year or month' });
      }
  
      if (parsedMonth < 1 || parsedMonth > 12) {
        return res.status(400).json({ error: 'Month must be between 1 and 12' });
      }
  
      const startDate = new Date(Date.UTC(parsedYear, parsedMonth - 1, 1, 0, 0, 0, 0));
      const endDate = new Date(Date.UTC(parsedYear, parsedMonth, 0, 23, 59, 59, 999));
  
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return res.status(400).json({ error: 'Invalid date range' });
      }
  
      const summary = await Expense.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(req.user.id),
            createdAt: { $gte: startDate, $lte: endDate }
          }
        },
        {
          $group: {
            _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
            totalAmount: { $sum: "$amount" }
          }
        },
        {
          $sort: { "_id.month": 1 }
        }
      ]);
  
      if (summary.length === 0) {
        return res.json({ message: 'No expenses found' });
      }
  
      res.json(summary);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch monthly summary' });
    }
  });

  router.get('/getCatExpense',protect,async(req, res)=>{
    const {startDate, endDate} = req.query;

    let filter = {};

    if(startDate || endDate){
      filter.createdAt = {}

    }else{
      res.status(400).json('invalid date');
    }
    // const utcStartDate = new Date(Date.UTC(startDate,0,0,0,0));
    // const utcEndDate = new Date(Date.UTC(endDate,23,59,59,999));
    if(startDate){
      const start = new Date(startDate);
      start.setHours(0,0,0,0);
      filter.createdAt.$gte = start;
    }
    if(endDate){
      const end = new Date(endDate);
      end.setHours(23,59,59,999);
      filter.createdAt.$lte = end;
    }

    filter.userId = req.user.id;

    try {
      const result = await Expense.aggregate([
        {
          $match: filter
        },
        {
          $group:{
            _id: "$category",
            totalAmount:{$sum: "$amount"}
          }
        }
      ]);
      res.json(result);
      //console.log("result",result);
    } catch (error) {
      res.status(500).json('error in aggregation');
      console.log(error);
    }
  });
  
  

export default router;
