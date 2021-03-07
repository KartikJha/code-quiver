import mongoose from 'mongoose';
mongoose.connect('mongodb://smallcase-dev:Smallcasedevpassword%40123@db-1.dev-int-smallcase.com:27017,db-2.dev-int-smallcase.com:27017,db-3.dev-int-smallcase.com:27017/?authSource=smallcase-dev&replicaSet=devReplica&readPreference=primary&appname=MongoDB%20Compass&ssl=false', async (err) => {
    if (!err) {
        var a = mongoose.connection.useDb('smallcase-dev').collection('leprechaun.orders');
        // var a = mongoose.connection.collection('leprechaun.orders');
        a.find().skip().limit(1)
        var x = await a.findOne(({ _id: new mongoose.Types.ObjectId('56ff7c760781608029cb5cff') }));
        console.log(x)
    }
});




while (curr < 148742) {
    try {
        const inSip = await sipsInvestigateColl.find({ type: 'WEIGHTS' }).sort({ '_id': -1, });
        console.log(`In sipDoc: `, JSON.stringify(inSip));
        const sipDoc = await Sip.findById(inSip._id).lean();
        if (!sipDoc || !isEqual(sipDoc, inSip)) {
            console.log(`Sip needs to be processed`);
            result.push(inSip);
        }
    }
    catch (e) {
        console.log(`Failed while processing doc: ${curr + 1}`, e.message, e.stack);
    }
    curr++;
}
for (let i = 0; i < result.length; i++) {
    try {
        const archivedSip = await ArchivedSip.findOne({ '_id': result[i]._id, 'archived.by': String(result[i].userId) });
        if (!archivedSip) {
            finalResult.push(result[i]);
        }
    }
    catch (e) {
        console.log(`Failed while checking deletion: ${JSON.stringify(result[i])}`, e.message, e.stack);
    }




    [
        {
            "type": "SHARES",
            "instalmentCount": 0,
            "userId": {
              "$oid": "5fd09d9d0bae996a8ad71f1c"
            },
            "iscid": {
              "$oid": "5fd268d6d6d239a01fd8df90"
            },
            "scid": "KTKNM_0020",
            "name": "Quality Starter Pack",
            "shortDescription": "A portfolio constituting banking and life insurance companies",
            "source": "PROFESSIONAL",
            "amount": 1800,
            "scheduledDate": {
              "$date": "2021-01-10T00:00:00Z"
            },
            "frequency": "1m",
            "broker": {
              "name": "kotak",
              "userId": "MONU_10"
            },
            "sharesConfig": [
              {
                "sid": "ICBK",
                "shares": 1
              },
              {
                "sid": "ICIR",
                "shares": 1
              },
              {
                "sid": "SBI",
                "shares": 2
              }
            ],
            "date": {
              "$date": "2020-12-10T18:28:39.162Z"
            },
            "weightConfig": [],
            "__v": 0
          },
          {
            "type": "SHARES",
            "instalmentCount": 0,
            "userId": {
              "$oid": "5f3f98d16eb5159400c3c936"
            },
            "iscid": {
              "$oid": "5f892855770babe38e7249b4"
            },
            "scid": "5f890a4ff895516be04e0539",
            "name": "Babla stock",
            "shortDescription": "Good ",
            "source": "CREATED",
            "amount": 6287.55,
            "scheduledDate": {
              "$date": "2020-12-12T00:00:00Z"
            },
            "frequency": "1m",
            "broker": {
              "name": "hdfc",
              "userId": "2322134"
            },
            "sharesConfig": [
              {
                "sid": "INFY",
                "shares": 3
              },
              {
                "sid": "TCS",
                "shares": 1
              }
            ],
            "date": {
              "$date": "2020-12-11T01:33:59.243Z"
            },
            "weightConfig": [],
            "__v": 0
          },
          {
            "type": "SHARES",
            "instalmentCount": 0,
            "userId": {
              "$oid": "5dbc591d610be8528761f120"
            },
            "iscid": {
              "$oid": "5fbdc6a709367cd51dd1e0de"
            },
            "scid": "5fbd031d09367cd51dd1b5bb",
            "name": "Core-ETF",
            "shortDescription": "Long Term Postional - ETF",
            "source": "CREATED",
            "amount": 5000,
            "scheduledDate": {
              "$date": "2020-12-27T00:00:00Z"
            },
            "frequency": "1m",
            "broker": {
              "name": "hdfc",
              "userId": "2822387"
            },
            "sharesConfig": [
              {
                "sid": "N100",
                "shares": 1
              },
              {
                "sid": "UTIS",
                "shares": 6
              },
              {
                "sid": "IICI",
                "shares": 11
              }
            ],
            "date": {
              "$date": "2020-12-11T04:12:48.311Z"
            },
            "weightConfig": [],
            "__v": 0
          },
          {
            "type": "SHARES",
            "instalmentCount": 0,
            "userId": {
              "$oid": "5fd09d9d0bae996a8ad71f1c"
            },
            "iscid": {
              "$oid": "5fd268f8cfb77b8a0a1ec865"
            },
            "scid": "KTKNM_0019",
            "name": "First Time Favourites",
            "shortDescription": "A portfolio constituting two banks with a judicious mix of value and growth",
            "source": "PROFESSIONAL",
            "amount": 3700,
            "scheduledDate": {
              "$date": "2021-01-10T00:00:00Z"
            },
            "frequency": "1m",
            "broker": {
              "name": "kotak",
              "userId": "MONU_10"
            },
            "sharesConfig": [
              {
                "sid": "ICBK",
                "shares": 4
              },
              {
                "sid": "SBI",
                "shares": 7
              }
            ],
            "date": {
              "$date": "2020-12-10T18:29:12.996Z"
            },
            "weightConfig": [],
            "__v": 0
          },
    ]