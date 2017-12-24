module.exports = "<div class='comment'>"+
"    <div ><%= commentItem.author%>"+
" <float class = 'date'><%= new Date(commentItem.date).toLocaleDateString()  %><float></div>"+
"  <div style='font-style: italic;'><%= commentItem.text%></div>"+
        "</div>";


