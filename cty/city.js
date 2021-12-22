function getContent(data, i){
    return`<tr>
    <td>${i+1}</td>
    <td>${data[i].name}</td>
    <td>${data[i].area}</td>
    <td>${data[i].population}</td>
    <td>${data[i].gdp}</td>
    <td>${data[i].note}</td>
    <td>${data[i].country?.name}</td>
    <td><button onclick="showEditCity(${data[i].id})">Edit</button></td>
    <td><button onclick="deleteCity(${data[i].id})">Delete</button></td>
    </tr>`
}
function showList(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/city",
        success:function (data){
            let content = "";
            for (let i = 0; i < data.length; i++) {
                content+=getContent(data,i)
            }
            $("#city").html(content)
        }
    });
}
function addNewCity(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/country/list",
        success:function (data){
            let content = "";
            for (let i = 0; i < data.length; i++) {
                content += `<option value="${data[i].id}">${data[i].name}</option>`
            }

            document.getElementById('country').innerHTML = content;
        }
    });
    document.getElementById("addCity").innerHTML=`<table>
    <tr>
        <td>Name</td>
        <td><input type="text" id=" name" placeholder="name"></td>
    </tr>
    <tr>
        <td>Area</td>
        <td><input type="text" id="area" placeholder="area"></td>
     </tr>
     <tr>
        <td>Population</td>
         <td><input type="text" id="population" placeholder="population"></td>
    </tr>
    <tr>
        <td>GDP</td>
        <td><input type="text" id="gdp" placeholder="gdp"></td>
    </tr>
     <tr>
        <td>Note</td>
        <td><input type="text" id="note" placeholder="note"></td>
    </tr>
    <tr>
            <td>Country:</td>
            <td> <select id="country">
       
            </select></td>
        </tr>
    <tr>
           <td></td>
           <td><input type="submit" value="Create" onclick="addNew()"></td>
</tr>
</table>`
}
function addNew(){
    let name =$('#name').val();
    let area =$('#area').val();
    let population =$('#population').val();
    let gdp =$('#gdp').val();
    let note =$('#note').val();
    let country = $('#country').val();
    let newCity={
        name:name,
        area:area,
        population:population,
        gdp:gdp,
        note:note,
        country:{id:country}
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newCity),
        url: `http://localhost:8080/city`,
        enctype : 'multipart/form-data',
        success: showList
    })
}
function deleteCity(id){
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/city/` + id,
        success: showList
    });
    event.preventDefault();
}
function showEditCity(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/country/list",
        success:function (data){
            let content = "";
            for (let i = 0; i < data.length; i++) {
                content += `<option value="${data[i].id}">${data[i].name}</option>`
            }

            document.getElementById('country').innerHTML = content;
        }
    })
    document.getElementById("addCity").innerHTML=`<table>
    <tr>
        <td>Name</td>
        <td><input type="text" id=" cname" placeholder="name"></td>
    </tr>
    <tr>
        <td>Area</td>
        <td><input type="text" id="carea" placeholder="area"></td>
     </tr>
     <tr>
        <td>Population</td>
         <td><input type="text" id="cpopulation" placeholder="population"></td>
    </tr>
    <tr>
        <td>GDP</td>
        <td><input type="text" id="cgdp" placeholder="gdp"></td>
    </tr>
     <tr>
        <td>Note</td>
        <td><input type="text" id="cnote" placeholder="note"></td>
    </tr>
    <tr>
            <td>Country:</td>
            <td> <select id="ccountry">
       
            </select></td>
        </tr>
    <tr>
           <td></td>
           <td><input type="submit" value="Update" onclick="editCity()"></td>
</tr>
</table>`
}
function editCity(){
    let name =$('#cname').val();
    let area =$('#carea').val();
    let population =$('#cpopulation').val();
    let gdp =$('#cgdp').val();
    let note =$('#cnote').val();
    let country = $('#ccountry').val();
    let newCity={
        name:name,
        area:area,
        population:population,
        gdp:gdp,
        note:note,
        country:{id:ccountry}
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newCity),
        url: `http://localhost:8080/city`,
        enctype : 'multipart/form-data',
        success: showList
    })
}
