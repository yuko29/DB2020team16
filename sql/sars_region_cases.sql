select hi.Date as Date, hi.region as region, hi.cases as cases
from	(
	select hi.Date as Date, max(hi.cases) as cases
	from	(	
		select ha.bd as Date, ha.region as region, (ha.bc-max(ha.ac)) as cases
		from	(	
			select a.Date as ad, b.Date as bd, a.region as region, a.cases as ac, b.cases as bc	
			from	(	
				select hey.Date as Date, hey.region as region, sum(hey.cases) as cases
				from	(
					select ha.Date as Date, reg.region as region, ha.cases as cases, ha.Country as Country
					from	(
						select SUBSTR(sars.Date_reported, 1, 6) as Date, max(sars.Cumulative_cases) as cases, sars.Country as country
						from sars
						group by sars.Country, Date
						) as ha,
						(
						select covid19.country as country, covid19.WHO_region as region
						from who_covid_19 as covid19
						group by country, region
						) as reg
					where ha.Country = reg.Country
					) as hey
				group by hey.region, hey.Date
				) as a, 
				(	
				select hey.Date as Date, hey.region as region, sum(hey.cases) as cases
				from	(
					select ha.Date as Date, reg.region as region, ha.cases as cases, ha.Country as Country
					from	(
						select SUBSTR(sars.Date_reported, 1, 6) as Date, max(sars.Cumulative_cases) as cases, sars.Country as country
						from sars
						group by sars.Country, Date
						) as ha,
						(
						select covid19.country as country, covid19.WHO_region as region
						from who_covid_19 as covid19
						group by country, region
						) as reg
					where ha.Country = reg.Country
					) as hey
				group by hey.region, hey.Date
				) as b
			where a.Date < b.Date 
			and a.region = b.region
			) as ha
		group by ha.bd, region
		) as hi
	group by hi.Date
	) as max_d,
(	
		select ha.bd as Date, ha.region as region, (ha.bc-max(ha.ac)) as cases
		from	(	
			select a.Date as ad, b.Date as bd, a.region as region, a.cases as ac, b.cases as bc	
			from	(	
				select hey.Date as Date, hey.region as region, sum(hey.cases) as cases
				from	(
					select ha.Date as Date, reg.region as region, ha.cases as cases, ha.Country as Country
					from	(
						select SUBSTR(sars.Date_reported, 1, 6) as Date, max(sars.Cumulative_cases) as cases, sars.Country as country
						from sars
						group by sars.Country, Date
						) as ha,
						(
						select covid19.country as country, covid19.WHO_region as region
						from who_covid_19 as covid19
						group by country, region
						) as reg
					where ha.Country = reg.Country
					) as hey
				group by hey.region, hey.Date
				) as a, 
				(	
				select hey.Date as Date, hey.region as region, sum(hey.cases) as cases
				from	(
					select ha.Date as Date, reg.region as region, ha.cases as cases, ha.Country as Country
					from	(
						select SUBSTR(sars.Date_reported, 1, 6) as Date, max(sars.Cumulative_cases) as cases, sars.Country as country
						from sars
						group by sars.Country, Date
						) as ha,
						(
						select covid19.country as country, covid19.WHO_region as region
						from who_covid_19 as covid19
						group by country, region
						) as reg
					where ha.Country = reg.Country
					) as hey
				group by hey.region, hey.Date
				) as b
			where a.Date < b.Date 
			and a.region = b.region
			) as ha
		group by ha.bd, region
		) as hi
where hi.cases = max_d.cases
and hi.Date = max_d.Date 
order by hi.Date
