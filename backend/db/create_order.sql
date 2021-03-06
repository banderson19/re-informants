insert into orders (
    buyerid,
    ordername,
    -- address1,
    -- address2,
	-- city,
	-- state,
	-- zip,
	ordertype,
	ordernotes,
	ordervaliduntil,
	orderdatetime,
	address,
	lat,
	lng,
	orderresultid
    )

values
(
    ${buyerid},
    ${ordername},
    -- ${address1},
    -- ${address2},
	-- ${city},
	-- ${state},
	-- ${zip},
	${ordertype},
	${ordernotes},
	CURRENT_TIMESTAMP + (${durationday}::integer ||' day')::interval,
	CURRENT_TIMESTAMP,
	${address},
	${lat},
	${lng},
	${orderresultid}
)

RETURNING *;
