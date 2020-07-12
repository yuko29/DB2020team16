$(document).ready(function() {  
    data = {}  
    $.ajax({
		url: '/_worldcovidvsstock',
        type: 'GET',
		data: data,
		beforeSend: function(){
		},
		success: function(result){
            var chart = c3.generate({
                bindto: '#worldcovidvsstock',
                data: {
                    x: 'Date',
                    xFormat: '%Y/%m/%d',
                    rows: result.Data,
                    axes: {
                        Daily_cumulative_case: 'y2'
                    },
                },
                axis: {
                    x: {
                        type: 'timeseries',
                        tick: {
                            format: '%Y/%m/%d'
                        }
                    },
                    y2: {
                        show: true
                    }
                }              
            });
		},
		complete: function(){

		},
		error: function(result){
			alert("Error.\nMaybe you have closed the app or have a illegal query to database.\nPlease check the status.");
		}	
    })
    $.ajax({
		url: '/_twcovidvsstock',
        type: 'GET',
		data: data,
		beforeSend: function(){
		},
		success: function(result){
            var chart = c3.generate({
                bindto: '#twcovidvsstock',
                data: {
                    x: 'Date',
                    xFormat: '%Y/%m',
                    rows: result.Data,
                    axes: {
                        TW_cases: 'y',
                        TSEC_AdjClose: 'y2'
                    }
                },
                axis: {
                    x: {
                        type: 'timeseries',
                        tick: {
                            format: '%Y/%m'
                        }
                    },
                    y2: {
                        show: true
                    }
                }              
            });
		},
		complete: function(){

		},
		error: function(result){
			alert("Error.\nMaybe you have closed the app or have a illegal query to database.\nPlease check the status.");
		}	
    })
    $.ajax({
		url: '/_UScovidvsstock',
        type: 'GET',
		data: data,
		beforeSend: function(){
		},
		success: function(result){
            var chart = c3.generate({
                bindto: '#UScovidvsstock',
                data: {
                    x: 'Date',
                    xFormat: '%Y/%m',
                    rows: result.Data,
                    axes: {
                        Dow_AdjClose: 'y2'
                    },
                    types: {
                        Total_Cases: 'bar'
                    }
                },
                axis: {
                    x: {
                        type: 'timeseries',
                        tick: {
                            format: '%Y/%m'
                        }
                    },
                    y2: {
                        show: true
                    }
                }              
            });
		},
		complete: function(){

		},
		error: function(result){
			alert("Error.\nMaybe you have closed the app or have a illegal query to database.\nPlease check the status.");
		}	
    })
});  

$("#stockdatebtn").bind("click", function(){
	const form = document.forms["stock"];
	const year = form.elements.year.value;
	const month = form.elements.month.value;
    const day = form.elements.day.value;
    var date = year + '/' + month + '/' + day;
	var data = {
		Date: date
	}
	$.ajax({
		url: '/_stockdate',
        type: 'GET',
		data: data,
		beforeSend: function(){
            $("table").remove('#stockdatedata');
            $("table").remove('#historydata');
            $("#stockdatebtn").attr({ disabled: "disabled" });
		},
		success: function(result){
            var insertText = '<table class="table" id="stockdatedata"><thead>';
            insertText += '<tr>';
            for (var i=0; i<result.Header.length; i++)
            {
                insertText += '<td>';
                insertText += result.Header[i];
                insertText += '</td>';
            }
            insertText += '</tr></thead>';

            for(var i=0; i<result.Data.length; i++)
            {
                insertText += '<tr>';
                for(var j=0; j<result.Data[i].length; j++)
                {
                    insertText += '<td>';
                    insertText += result.Data[i][j];
                    insertText += '</td>';
                }
                insertText += '</tr>';
            }
            insertText += '</table>';
            
            $('#stockdate').append(insertText);
		},
		complete: function(){
			$("#stockdatebtn").removeAttr("disabled");
		},
		error: function(result){
			alert("Error.\nMaybe you have closed the app or have a illegal query to database.\nPlease check the status.");
		}		
    })
    
	$.ajax({
		url: '/_history',
        type: 'GET',
		data: data,
		beforeSend: function(){
            //
		},
		success: function(result){
            var insertText = '<table class="table" id="historydata"><thead>';
            insertText += '<tr>';
            for (var i=0; i<result.Header.length; i++)
            {
                insertText += '<td>';
                insertText += result.Header[i];
                insertText += '</td>';
            }
            insertText += '</tr></thead>';

            for(var i=result.Data.length-1; i>=result.Data.length-5 && i>=0; i--)
            {
                insertText += '<tr>';
                for(var j=0; j<result.Data[i].length; j++)
                {
                    insertText += '<td>';
                    insertText += result.Data[i][j];
                    insertText += '</td>';
                }
                insertText += '</tr>';
            }
            insertText += '</table>';
            
            $('#history').append(insertText);
		},
		complete: function(){
			//$("#stockdatebtn").removeAttr("disabled");
		},
		error: function(result){
			alert("Error.\nMaybe you have closed the app or have a illegal query to database.\nPlease check the status.");
		}		
    })
    
})

$("#historydelbtn").bind("click", function(){
	var data = {}
	$.ajax({
		url: '/_historydel',
        type: 'GET',
		data: data,
		beforeSend: function(){
            $("table").remove('#historydata');
            $("#historydelbtn").attr({ disabled: "disabled" });
		},
		success: function(result){
            var insertText = '<table class="table" id="historydata"><thead>';
            insertText += '<tr>';
            for (var i=0; i<result.Header.length; i++)
            {
                insertText += '<td>';
                insertText += result.Header[i];
                insertText += '</td>';
            }
            insertText += '</tr></thead>';

            for(var i=result.Data.length-1; i<result.Data.length-5 && i>=0; i++)
            {
                insertText += '<tr>';
                for(var j=0; j<result.Data[i].length; j++)
                {
                    insertText += '<td>';
                    insertText += result.Data[i][j];
                    insertText += '</td>';
                }
                insertText += '</tr>';
            }
            insertText += '</table>';
            
            $('#history').append(insertText);
		},
		complete: function(){
			$("#historydelbtn").removeAttr("disabled");
		},
		error: function(result){
			alert("Error.\nMaybe you have closed the app or have a illegal query to database.\nPlease check the status.");
		}		
    })
})

$("#regionRatebtn").bind("click", function(){
	const form = document.forms["regionRate"];
	const region = form.elements.region.value;
	var data = {
		Region: region
    }
	$.ajax({
		url: '/_regionRate',
        type: 'GET',
		data: data,
		beforeSend: function(){
            //$("div").remove('#regionRatedata');
            //$("#regionRate").append('<div id="regionRatedata"></div>');
            $("#regionRatedatabtn").attr({ disabled: "disabled" });
		},
		success: function(result){
            var chart = c3.generate({
                bindto: '#regionRatedata',
                data: {
                    x: 'Date',
                    xFormat: '%Y/%m',
                    rows: result.Data,
                    axes: {
                        rate: 'y',
                        Dow_Adj_Close_rate: 'y2'
                    }
                },
                axis: {
                    x: {
                        type: 'timeseries',
                        tick: {
                            format: '%Y/%m'
                        }
                    },
                    y2: {
                        show: true
                    }
                }     
            });
		},
		complete: function(){
			$("#regionRatedatabtn").removeAttr("disabled");
		},
		error: function(result){
			alert("Error.\nMaybe you have closed the app or have a illegal query to database.\nPlease check the status.");
		}
		
	})
	
})
