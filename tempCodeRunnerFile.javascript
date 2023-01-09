let num = 9;



function twoSum(nums, target) {
    let result = [];
    for (let i = 0; i < nums.length; i++) {
      let complement = target - nums[i];
      let complementIndex = nums.indexOf(complement);
      if (complementIndex > -1 && complementIndex !== i) {
        result.push(i, complementIndex);
      }
    }
    return result;
  };


  console.log(twoSum(arr, target));