const historyState = {
    history:{}
};
// useNavigate(useHistory cũ) chỉ dùng cho component thôi chứ ko redux dc => ta phải đưa lên store sau đó ta dùng redux saga dùng hàm select lấy từ trên store về
// Saga sẽ lấy từ store về để dùng hàm useNavigate.Sở dĩ saga ko dùng dc hook ueNavigate vì nó là  function chứ ko phải components nên ko xài dc (hooks chỉ dùng dc cho react function component)
 const HistoryReducer = (state = historyState, action) => {
    switch (action.type) {
        case "ADD_HISTORY": {
            state.history = action.history;
            console.log(state.history)
            return { ...state }
        }
        default: return { ...state }
    }
}
export default HistoryReducer