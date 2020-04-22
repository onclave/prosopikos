import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class CovidNewsService {

	private NEWS_API: string = 'https://raw.githubusercontent.com/onclave/prosopikos/master/raw/covid_news.json';

	private newsObject: any[] = new Array();

	constructor(private httpClient: HttpClient) {

		this.initNewsObject();
	}

	public getNewsObject(): any[] {
		return this.newsObject;
	}

	public getNews() {
		return this.httpClient.get(this.NEWS_API);
	}

	private initNewsObject(): void {

		// {
		// 	"date": '',
		// 	"india": [{
		// 		"heading": '',
		// 		"description": '',
		// 		"source": ''
		// 	}, {
		// 		"heading": '',
		// 		"description": '',
		// 		"source": ''
		// 	}, {
		// 		"heading": '',
		// 		"description": '',
		// 		"source": ''
		// 	}],
		// 	"world": [{
		// 		"heading": '',
		// 		"description": '',
		// 		"source": ''
		// 	}, {
		// 		"heading": '',
		// 		"description": '',
		// 		"source": ''
		// 	}, {
		// 		"heading": '',
		// 		"description": '',
		// 		"source": ''
		// 	}]
		// }

		this.newsObject = [
		 {
			"date": '15 / 04 / 2020',
			"india": [{
				"heading": 'Doctors, cops injured after stone-pelting on an ambulance in Moradabad',
				"description": 'Uttar Pradesh Chief Minister Yogi Adityanath has ordered the police to book 10 people accused of pelting stones and injuring health workers in Moradabad earlier in the day. A team of doctors and medical staff was attacked by a mob in Moradabad\'s Nawabganj area when they went to take away two suspected cases of the novel coronavirus in the area.',
				"source": 'https://www.indiatoday.in/india/story/doctors-attacked-in-moradabad-up-cm-orders-to-book-10-accused-under-nsa-1667251-2020-04-15'
			}, {
				"heading": 'Thousands of students stranded in Rajasthan\'s Kota as native states refuse to let them in during lockdown',
				"description": 'The district administration in Kota had earlier allowed the students to leave for their native states. However, in the wake of refusal by the states to let these students in, the permission was withdrawn on Tuesday, leaving several students stranded.',
				"source": 'https://www.indiatoday.in/india/story/thousands-of-students-stranded-in-rajasthan-s-kota-as-native-states-refuse-to-let-them-in-during-lockdown-1667331-2020-04-15'
			}, {
				"heading": 'Lone Covid-19 Patient in Meghalaya Dies, CM Sangma Expresses Grief',
				"description": 'The lone COVID-19 patient in Meghalaya died on Wednesday morning, Chief Minister Conrad Sangma said. Sixty nine-year-old Dr John L Sailo Ryntathiang, the founder of Bethany Hospital, died at 2.45 am in the morning, a family member said.',
				"source": 'https://www.news18.com/news/india/lone-covid-19-patient-in-meghalaya-dies-cm-sangma-expresses-grief-2578131.html'
			}],
			"world": [{
				"heading": 'Debt Relief For A Year For Poorest Nations Amid COVID-19, Announces G20',
				"description": 'With the global economy plunged into the worst recession in a century, the Group of 20 nations on Wednesday announced a one-year debt standstill for the world\'s poorest nations as they struggle to deal with the coronavirus pandemic.',
				"source": 'https://www.ndtv.com/world-news/coronavirus-outbreak-g20-agrees-to-temporary-debt-halt-for-poorest-nations-amid-covid-19-2212484'
			}, {
				"heading": 'China Shuts Down Largest Makeshift COVID-19 Hospital in Wuhan, Last Batch of Medics Leave',
				"description": 'As the number of coronavirus cases abates, China on Wednesday shut down one of its largest makeshift hospitals built in February to treat the surging COVID-19 infections in Wuhan, the epicentre of the pandemic, as the last group of thousands of medical workers deployed to fight the outbreak also left the city.',
				"source": 'https://www.news18.com/news/world/china-shuts-down-largest-makeshift-covid-19-hospital-in-wuhan-last-batch-of-medics-leave-2578207.html'
			}, {
				"heading": 'Major airlines of US line up to split $25 billion in payroll aid',
				"description": 'The nation\'s biggest airlines have tentatively agreed to terms for $25 billion in government aid to pay workers and avoid massive layoffs in an industry that has been slammed by the coronavirus pandemic. The assistance will include a mix of cash and loans, with the government getting warrants that can be converted into small ownership stakes in the leading airlines.',
				"source": 'https://www.indiatoday.in/world/story/coronavirus-pandemc-major-airlines-us-line-split-billion-payroll-1667193-2020-04-15'
			}]
		}, {
			"date": '14 / 04 / 2020',
			"india": [{
				"heading": 'Lockdown extension, more stringent measures; PM Modi\'s speech in 10 points',
				"description": 'Prime Minister Narendra Modi on Tuesday announced a 19-day extension of the lockdown imposed to fight the coronavirus, advised against layoffs and urged the public to be kind to professionals on the front lines of the battle against COVID-19.',
				"source": 'https://www.indiatoday.in/india/story/pm-modi-speech-on-lockdown-summary-1666698-2020-04-14'
			}, {
				"heading": 'Cops lathicharge migrants as thousands gather at Bandra station to leave Mumbai, defy lockdown orders',
				"description": 'Mumbai\'s Bandra West railway station was flooded with migrant labourers who were hoping to get back home as they expected the lockdown to end on Tuesday. The people gathered at the station are mostly daily wage labourers who are not able to earn since the government imposed a nationwide lockdown on March 25.',
				"source": 'https://www.indiatoday.in/india/story/lockdown-woes-mumbai-stations-flooded-with-migrant-labourers-hoping-to-get-back-home-1666908-2020-04-14'
			}, {
				"heading": 'Puducherry Congress MLA "Violates" Lockdown Norms',
				"description": 'A ruling Congress MLA, a close confidante of Puducherry Chief Minister V Narayanasamy, has been charged for the second time for allegedly violating the COVID-19 lockdown orders and distributing relief materials in his village drawing a crowd of over 150 people, police said on Tuesday.',
				"source": 'https://www.ndtv.com/india-news/coronavirus-puducherry-congress-mla-violates-lockdown-norms-charged-second-time-police-2211909?pfrom=home-topstories'
			}],
			"world": [{
				"heading": 'South Korea holds national elections during coronavirus pandemic',
				"description": 'South Koreans voted in the parliamentary elections on Wednesday. To hold the elections as scheduled, South Korean election officials and health authorities drew up a deliberate set of preventive measures to reduce risks of the virus being transmitted.',
				"source": 'https://www.indiatoday.in/world/story/south-korea-holds-national-elections-during-coronavirus-pandemic-masks-clinics-1667090-2020-04-15'
			}, {
				"heading": 'UN Warns Of Another Dangerous Epidemic - Misinformation On Coronavirus',
				"description": 'United Nations chief Antonio Guterres warned that "misinfo-demic" about COVID-19 on various social media platforms such as WhatsApp is proliferating falsehoods and announced a new UN initiative to flood the internet with facts and science to counter the "poison" of misinformation that is putting more lives at risk.',
				"source": 'https://www.ndtv.com/world-news/coronavirus-pandemic-united-nations-warns-of-another-dangerous-epidemic-misinformation-on-covid19-2211962'
			}, {
				"heading": 'Wuhan is fighting the virus one cheap test at a time',
				"description": 'The coronavirus pandemic has swept up the world and the most difficult aspect of fighting it is the financial cost of testing. A report by Reuters explains how easy, fast, and cheap it is to get tested in Wuhan.',
				"source": 'https://economictimes.indiatimes.com/news/international/world-news/wuhan-is-fighting-the-virus-one-cheap-test-at-a-time/easy-fast-and-accessible/slideshow/75139189.cms'
			}]
		}, {
			"date": '13 / 04 / 2020',
			"india": [{
				"heading": 'Meghalaya reports first COVID-19 case after Shillong-based doctor tests positive',
				"description": 'Meghalaya reported its first coronavirus case on Monday after a Shillong-based doctor tested positive for the COVID-19 infection. Confirming the report, Meghalaya chief secretary said, in a press release, that a doctor from Bethany hospital has tested positive for coronavirus.',
				"source": 'https://www.indiatoday.in/india/story/meghalaya-reports-first-covid-19-case-after-shillong-based-doctor-tests-positive-1666637-2020-04-14'
			}, {
				"heading": 'Lockdown 2.0 with exceptions to restart economy',
				"description": 'Prime Minister Narendra Modi\'s address on the last day of the 21-day lockdown has sparked indications of a two-week extension but with some exceptions to start some economic activities in a graded manner in India. An extension of the lockdown till the end of the month is expected to try and contain the spread of coronavirus which has affected over 9,000 people in India.',
				"source": 'https://www.indiatoday.in/india/story/lockdown-extension-with-exceptions-to-restart-economy-whats-proposed-ahead-of-pm-modis-address-1666661-2020-04-14'
			}, {
				"heading": 'Islamic Sect Chief\'s Quarantine Ends, To Join Probe Linked To COVID-19',
				"description": 'Maulana Saad, 56, had been under quarantine since March 28. His lawyer on April 8 said he will join investigation after the quarantine period ends in a case related to Tablighi Jamaat\'s Nizamuddin event.',
				"source": 'https://www.ndtv.com/india-news/coronavirus-tablighi-jamaats-maulana-saad-kandhalvis-14-day-quarantine-ends-to-join-probe-2211233'
			}],
			"world": [{
				"heading": 'US Approves Sale Of Missile, Torpedoes Worth $ 155 Million To India',
				"description": 'The sale of 10 AGM-84L Harpoon Block II air-launched missiles is estimated to cost USD 92 million, while 16 MK 54 All Up Round Lightweight Torpedoes and three MK 54 Exercise Torpedoes are estimated to cost USD 63 million, the Defense Security Cooperation Agency said.',
				"source": 'https://www.ndtv.com/india-news/us-approves-sale-of-missile-torpedoes-worth-155-million-to-india-2211264'
			}, {
				"heading": 'COVID-19 is 10 times more deadly than swine flu says WHO',
				"description": 'The novel coronavirus is 10 times more deadly than swine flu, also called H1N1, which caused a global pandemic in 2009, the World Health Organization said Monday, calling for control measures to be lifted "slowly".',
				"source": 'https://www.indiatoday.in/world/story/covid19-10-times-more-deadly-than-swine-flu-who-1666610-2020-04-13'
			}, {
				"heading": 'Trump blames Obama for lack of coronavirus tests:; ‘I don’t take responsibility at all’',
				"description": 'President Donald Trump refused to accept any responsibility for the slow rate of coronavirus testing in the United States, saying on Friday that he was “given a set of circumstances” that wasn’t meant for the high numbers of potential COVID-19 infections.',
				"source": 'https://www.cnbc.com/2020/03/13/coronavirus-trump-says-i-dont-take-responsibility-at-all-for-lack-of-tests.html?__source=sharebar'
			}]
		}, {
			"date": '12 / 04 / 2020',
			"india": [{
				"heading": 'Delhi govt to sanitise city\'s red, orange zones from Monday, says Arvind Kejriwal',
				"description": 'The Delhi government will start a massive sanitisation drive in the city’s Covid-19 containment zones, declared as ‘Red Zones’ and the high-risk zones, identified as ‘Orange Zones’ from Monday, chief minister Arvind Kejriwal said.',
				"source": 'https://www.indiatoday.in/india/story/covid-19-delhi-govt-to-sanitise-city-s-red-orange-zones-from-monday-says-arvind-kejriwal-1666196-2020-04-12'
			}, {
				"heading": 'Centre To Set Up 20 Lakh "Suraksha Stores" To Provide Essential Supplies',
				"description": 'Ahead of extending restrictions on the mobility of goods and persons, the government plans to set up a chain of 20 lakh retail shops called "Suraksha Stores" across India which will provide daily essentials to citizens while maintaining stringent safety norms.',
				"source": 'https://www.ndtv.com/india-news/coronavirus-updates-centre-to-set-up-20-lakh-suraksha-stores-to-provide-essential-supplies-2210422'
			}, {
				"heading": 'Policeman\'s hand chopped off, two others injured in attack by \'Nihangis\' in Punjab',
				"description": 'A policeman\'s hand was chopped off and two other police officials were injured when a group of people allegedly attacked them in Punjab\'s Patiala district on Sunday, police said.',
				"source": 'https://economictimes.indiatimes.com/news/politics-and-nation/policemans-hand-chopped-off-two-others-injured-in-attack-by-nihangis-in-punjab/articleshow/75104729.cms'
			}],
			"world": [{
				"heading": 'UAE ready to fly stranded Indians if they test negative for coronavirus',
				"description": 'The UAE has offered to fly stranded Indians and citizens of other countries, who wish to be repatriated if they test negative for COVID-19, the country’s envoy to India told a Gulf daily.',
				"source": 'https://www.indiatoday.in/world/story/uae-ready-to-fly-stranded-indians-if-they-test-negative-for-coronavirus-envoy-1666163-2020-04-12'
			}, {
				"heading": '"We\'re Social Animals": Hong Kong Residents Flout Lockdown On Festival',
				"description": 'People in Hong Kong thronged beaches, ferries and outlying islands on Sunday, many of them violating ban on gatherings of more than four people aimed at containing the spread of the new coronavirus.',
				"source": 'https://www.ndtv.com/world-news/coronavirus-outbreak-hong-kong-residents-flout-lockdown-on-festival-were-social-animals-2210513'
			}, {
				"heading": 'Sri Lanka Makes Cremations Compulsory for Coronavirus Deaths, Angering Muslims',
				"description": 'Sri Lanka made cremations compulsory for coronavirus victims on Sunday, ignoring protests from the country\'s minority Muslims who say it goes against Islamic tradition. "The corpse of a person who has died or is suspected to have died, of... COVID-19 shall be cremated," Health Minister Pavithra Wanniarachchi said Sunday.',
				"source": 'https://www.news18.com/news/world/sri-lanka-makes-cremations-compulsory-for-coronavirus-deaths-angering-muslims-2574865.html'
			}]
		}, {
			"date": '11 / 04 / 2020',
			"india": [{
				"heading": 'West Bengal schools and colleges closed till June 10, lockdown extended till April 30',
				"description": 'WB Chief Minister Mamata Banerjee declared on Saturday that schools and colleges would be closed till June 10 on account of an extended lockdown for COVID-19 in the state till April 30.',
				"source": 'https://www.indiatoday.in/education-today/news/story/west-bengal-schools-and-colleges-closed-till-june-10-lockdown-extended-1665919-2020-04-11'
			}, {
				"heading": 'No shortage of hydroxychloroquine, private sector to make 2-3 crore more tablets',
				"description": 'The health ministry said it is coordinating with pharma companies to produce two-three crore more hydroxychloroquine (HCQ) tablets.',
				"source": 'https://www.indiatoday.in/india/story/no-shortage-of-hcq-private-sector-to-make-2cr-more-tablets-govt-1665925-2020-04-11'
			}, {
				"heading": 'Centre Considering Request to Extend National Lockdown till April 30 after Consensus among States',
				"description": 'The nationwide lockdown imposed by Prime Minister Narendra Modi in the wake of the Covid-19 outbreak in India is likely to continue beyond April 14. The PM told the chief ministers that all their suggestions will be taken into consideration and that the Centre and states are united in this fight.',
				"source": 'https://www.news18.com/news/india/covid-19-outbreak-india-lockdown-likely-to-continue-till-april-30-pm-modi-to-discuss-new-strategy-with-cms-today-2573393.html'
			}],
			"world": [{
				"heading": 'Teenager From Isolated Amazon Tribe in Brazil Dies After Being Infected with Coronavirus',
				"description": 'The 15-year-old boy, the first Yanomami to be diagnosed with the virus, was hospitalized a week ago at an intensive care unit in Boa Vista, the capital of the northern state of Roraima, officials said.',
				"source": 'https://www.news18.com/news/world/teenager-from-isolated-amazon-tribe-in-brazil-dies-after-being-infected-with-coronavirus-2573351.html'
			}, {
				"heading": 'Iran Begins Lifting Restrictions After Brief Coronavirus Lockdown',
				"description": 'Iran began reopening government offices Saturday after a brief nationwide lockdown to help contain the worst coronavirus outbreak in the Middle East, which has killed more than 4,300 people in the country.',
				"source": 'https://www.news18.com/news/world/iran-begins-lifting-restrictions-after-brief-coronavirus-lockdown-2573993.html'
			}, {
				"heading": 'New York Public Schools To Remain Shut For Rest Of School Year',
				"description": 'New York City Mayor Bill de Blasio said on Saturday public schools will remain closed for the rest of the school year as the city battles the outbreak of the novel coronavirus. "Having to tell you that we cannot bring our schools back for the remainder of this school year is painful, but I can also tell you it is the right thing to do," he told in a news conference.',
				"source": 'https://www.ndtv.com/world-news/covid-19-us-new-york-public-schools-to-remain-shut-for-rest-of-school-year-2210168'
			}]
		}, {
			"date": '10 / 04 / 2020',
			"india": [{
				"heading": 'Death toll nears 200-mark, 30 deaths, 547 new Covid-19 cases in 12 hours',
				"description": 'Over 650 positive cases of novel coronavirus in the last 24 hours, ending Friday morning, have taken India’s tally over 6,400 while the death toll is about to reach the 200-mark. According to the Union health ministry, the total number of positive COVID-19 cases in India has climbed to 6,412. These include 5,709 active cases while 504 have been either cured or discharged.',
				"source": 'https://www.indiatoday.in/india/story/coronavirus-india-news-update-number-covid19-tally-total-death-toll-1665349-2020-04-10'
			}, {
				"heading": 'Punjab govt extends lockdown till May 1',
				"description": 'The Captain Amarinder Singh-led Punjab government has decided to extend the lockdown in the state till May 1. This decision was taken at a state cabinet meeting today and comes at a time when Punjab is seeing a rapid rise in the number of COVID-19 cases that have already crossed the 100-mark in the state.',
				"source": 'https://www.indiatoday.in/india/story/coronavirus-punjab-govt-extends-lockdown-1665578-2020-04-10'
			}, {
				"heading": 'Here\'s What You Can Expect In Air Travel After The Lockdown Ends',
				"description": 'With the number of coronavirus cases in the country rising dramatically - the biggest single-day spike came on Friday - it seems quite clear that air travel in the country will not be resumed any time soon. When that does eventually happen, airports in India and flights within India and on international routes may not be anything that we are used to.',
				"source": 'https://www.ndtv.com/india-news/coronavirus-covid-19-flight-tickets-heres-what-you-can-expect-in-air-travel-after-the-lockdown-ends-2209798'
			}],
			"world": [{
				"heading": 'With 605 COVID-19 Deaths, Spain Records Lowest Fatalities In 17 Days',
				"description": 'Spain has recorded its lowest daily death count from the new coronavirus in 17 days, with 605 people dying, the government said on Friday.',
				"source": 'https://www.ndtv.com/world-news/coronavirus-spain-with-605-covid-19-deaths-spain-records-lowest-fatalities-in-17-days-2209537'
			}, {
				"heading": 'For Students at a Lone School in California, Class Is Still On',
				"description": 'Of the 10,521 public schools in California, Outside Creek is the lone holdout, a tiny school in a remote rural community in the San Joaquin Valley that is insisting on holding classes for the 21 students from kindergarten through eighth grade who showed up last week.',
				"source": 'https://www.nytimes.com/2020/04/10/us/coronavirus-california-school.html?action=click&module=Top%20Stories&pgtype=Homepage'
			}, {
				"heading": 'China to continue screening Wuhan residents for coronavirus amid lifting of restrictions',
				"description": 'China\'s Wuhan city, where the global coronavirus pandemic began, is still testing residents regularly despite relaxing its tough two-month lockdown, with the country wary of a rebound in cases even as it sets its sights on normalising the economy.',
				"source": 'https://www.indiatoday.in/world/story/china-to-continue-screening-wuhan-residents-for-coronavirus-amid-lifting-of-restrictions-1665497-2020-04-10'
			}]
		}, {
			"date": '09 / 04 / 2020',
			"india": [{
				"heading": 'Odisha first Indian state to extend Covid-19 lockdown till April 30',
				"description": 'Amid unconfirmed speculation about the nationwide lockdown due to end on April 14, Odisha has become the first Indian state to extend the ongoing lockdown. In a video statement on Thursday, Chief Minister Naveen Patnaik said that his government has decided to extend the lockdown period in Odisha till April 30.',
				"source": 'https://www.indiatoday.in/india/story/odisha-first-indian-state-to-extend-covid-19-lockdown-till-april-30-1665028-2020-04-09'
			}, {
				"heading": 'Firm says its Covid-19 testing kit will give results in 1 hour',
				"description": 'Molbio Diagnostics Private Limited said its testing kits will help the health department get results of Covid-19 suspected people much faster. Much of the tests which are being conducted now take more than a day or more to show results.',
				"source": 'https://www.indiatoday.in/india/story/coronavirus-firm-says-its-covid-19-testing-kit-will-give-results-in-1-hour-1665215-2020-04-09'
			}, {
				"heading": 'Medical Superintendent Of Government Hospital In Howrah Tests Coronavirus Positive',
				"description": 'On a day West Bengal Chief Minister Mamata Banerjee announced 12 new cases of active positive COVID-19 in the state, the medical superintendent-cum-vice principal of the government-run district hospital in Howrah tested positive and was admitted to a hospital in Kolkata earmarked for coronavirus patients.',
				"source": 'https://www.ndtv.com/india-news/coronavirus-in-west-bengal-medical-superintendent-of-government-hospital-in-howrah-tests-covid-19-po-2209178'
			}],
			"world": [{
				"heading": '98-Year-Old Indian-Origin Woman Beats COVID-19, Returns Home In UK',
				"description": 'A 98-year-old Indian-origin woman has pleasantly surprised her doctors and family after beating Covid-19 to return to her home in Scotland within days of her hospital admission.',
				"source": 'https://www.ndtv.com/indians-abroad/98-year-old-indian-origin-woman-beats-covid-19-returns-home-in-uk-2209168'
			}, {
				"heading": '150 members of the Saudi royal family have coronavirus',
				"description": 'Prince Faisal bin Bandar bin Abdulziz al Saud, the governor of Riyadh and a nephew of King Salman, was confirmed to have tested positive by two doctors, according to the Times. Many of the thousands of princes in the family are believed to have brought back the virus after travelling to Europe, the newspaper reported, citing doctors and people close to the family.',
				"source": 'https://thehill.com/policy/international/middle-east-north-africa/491971-150-members-of-the-saudi-royal-family-have'
			}, {
				"heading": 'UN Warns Nations Using "Unlimited" Emergency Powers To Deal With Pandemic',
				"description": 'The coronavirus crisis is not a "blank cheque" to flout civil liberties, the UN human rights commissioner warned on Thursday as she criticised some states\' adoption of "unlimited" emergency powers.',
				"source": 'https://www.ndtv.com/world-news/coronavirus-updates-un-warns-nations-using-unlimited-emergency-powers-to-deal-with-pandemic-2209058'
			}]
		}, {
			"date": '08 / 04 / 20',
			"india": [{
				"heading": 'PM Modi hints at extending Covid-19 lockdown at all-party meeting',
				"description": 'At the all-party meeting on Wednesday, Prime Minister Modi hinted that the ongoing coronavirus lockdown may be further extended. He will speak to all CMs on April 11 on the issue of lockdown extension.',
				"source": 'https://www.indiatoday.in/india/story/pm-modi-hints-at-extending-coronavirus-lockdown-1664717-2020-04-08'
			}, {
				"heading": 'To help small firms, India seen unveiling second coronavirus stimulus worth $13 billion',
				"description": 'A second stimulus package India is poised to announce in coming days will be worth around Rs 1 lakh crore ($13 billion) and focus on help for small and medium businesses weathering the coronavirus outbreak, two senior officials said on Wednesday.',
				"source": 'https://economictimes.indiatimes.com/news/economy/policy/to-help-small-firms-india-seen-unveiling-second-coronavirus-stimulus-worth-13-billion/articleshow/75053716.cms'
			}, {
				"heading": 'Hotspots in 15 UP Districts to be Sealed Till April 15, Govt Assures Home Delivery of Essentials',
				"description": 'The districts where hotspots are identified and will be sealed are Lucknow, Meerut, Shamli, Gautam Buddh Nagar, Varanasi, Sitapur, Agra, Kanpur, Bareilly, Saharanpur, Firozabad, Basti, Bulandshehar and Maharajganj.',
				"source": 'https://www.news18.com/news/india/hotspots-in-15-up-districts-to-be-sealed-till-april-15-as-cases-rise-govt-assures-home-delivery-of-essentials-2569697.html'
			}],
			"world": [{
				"heading": 'Italy, Pandemic’s New Epicenter, Has Lessons for the World',
				"description": 'The country’s experience shows that steps to isolate the coronavirus and limit people’s movement need to be put in place early, with absolute clarity, then strictly enforced.',
				"source": 'https://www.nytimes.com/2020/03/21/world/europe/italy-coronavirus-center-lessons.html'
			}, {
				"heading": '‘Now is not the time’, WHO responds to Trump’s threat to cut funding',
				"description": 'The WHO responded Wednesday to President Donald Trump’s threat to cut its funding, saying the move would not be appropriate during the global coronavirus pandemic. “We are still in the acute phase of a pandemic so now is not the time to cut back on funding,” Dr Hans Kluge, WHO regional director for Europe, told a virtual briefing, according to Reuters.',
				"source": 'https://www.cnbc.com/2020/04/08/who-responds-to-trumps-threat-to-cut-funding.html'
			}, {
				"heading": 'Coronavirus Invades Saudi Inner Sanctum',
				"description": 'More than six weeks after Saudi Arabia reported its first case, the coronavirus is striking at the heart of the kingdom’s sprawling royal family.',
				"source": 'https://www.nytimes.com/2020/04/08/world/middleeast/coronavirus-saudi-royal-infections.html'
			}]
		}, {
			"date": '07 / 04 / 2020',
			"india": [{
				"heading": 'Centre Considering States\' Request To Extend Lockdown: Government Sources',
				"description": 'Top government sources today said "a lot of state governments as well as experts" had requested that the 21-day lockdown to check the spread of coronavirus be extended beyond April 14. The central government is considering it, the sources said.',
				"source": 'https://www.ndtv.com/india-news/coronavirus-centre-considering-state-governments-experts-request-to-extend-lockdown-that-is-to-end-o-2207619?pfrom=home-topscroll'
			}, {
				"heading": '14-month-old dies of Covid-19 in Gujarat\'s Jamnagar',
				"description": 'The toddler, son of a migrant labourer-couple with no recent travel history, died in the evening at a government hospital in Jamnagar, said an official release. He was in a critical condition since he was admitted to the hospital.',
				"source": 'https://www.news18.com/news/india/14-month-old-boy-who-was-gujarats-youngest-coronavirus-patient-dies-in-jamnagar-2568857.html'
			}, {
				"heading": 'Stranded in India: 769 foreigners',
				"description": 'As many as 769 foreign tourists from across the country have registered on the “Stranded in India” portal within the first five days of its launch, sources in the Union home ministry said.',
				"source": 'https://www.telegraphindia.com/india/coronavirus-lockdown-stranded-in-india-registers-769-foreigners/cid/1762746?ref=india_india-page'
			}],
			"world": [{
				"heading": 'China\'s virus pandemic epicentre Wuhan ends 76-day lockdown',
				"description": 'The lockdown that served as a model for countries battling the coronavirus around the world has ended after 11 weeks. Chinese authorities are allowing residents of Wuhan to once again travel in and out of the sprawling city where the pandemic began.',
				"source": 'https://timesofindia.indiatimes.com/world/china/chinas-virus-pandemic-epicenter-wuhan-ends-76-day-lockdown/articleshow/75035237.cms'
			}, {
				"heading": 'UK PM Boris Johnson remains ‘stable’ in intensive care with coronavirus',
				"description": 'U.K. Prime Minister Boris Johnson was “stable” and in “good spirits” Tuesday and was getting “standard oxygen treatment” in the intensive care unit for the coronavirus, his spokesman said.',
				"source": 'https://www.cnbc.com/2020/04/07/coronavirus-world-leaders-rally-around-boris-johnson-in-intensive-care.html'
			}, {
				"heading": 'Donald Trump talks of ‘retaliation’ if India turns down Covid drug request',
				"description": 'President Donald Trump has warned India that the US may retaliate if it did not export anti-malarial drug hydroxychloroquine despite his personal request, saying he would be surprised if New Delhi did not relent as it has good relations with Washington.',
				"source": 'https://economictimes.indiatimes.com/industry/healthcare/biotech/pharmaceuticals/donald-trump-talks-of-retaliation-if-india-turns-down-covid-drug-request/articleshow/75020010.cms?from=mdr'
			}]
		}, {
			"date": '06 / 04 / 2020',
			"india": [{
				"heading": 'ICMR planning to scale up testing capacity to 1 lakh tests/day',
				"description": 'With a view to prepare for any worst-case scenario as Indian Council of Medical Research (ICMR) on Monday said it is planning several interventions which include scaling-up testing capacity to one lakh tests/day in the coming months.',
				"source": 'https://timesofindia.indiatimes.com/india/coronavirus-icmr-planning-to-scale-up-testing-capacity-to-1-lakh-tests/day/articleshow/75016567.cms'
			}, {
				"heading": 'President, PM, MPs to Take 30% Pay Cut for 1 Year as Covid-19 Infects Economy; MPLAD Funds Suspended',
				"description": 'Prime Minister Narendra Modi, his cabinet ministers and all Members of Parliament will take a 30% salary cut for the next one year, signalling a long road to recovery from the unprecedented economic blow caused by the COVID-19 pandemic.',
				"source": 'https://www.news18.com/news/india/president-kovind-pm-modi-mps-to-take-30-pay-cut-for-1-year-as-economic-crisis-looms-amid-covid-19-pandemic-2566649.html'
			}, {
				"heading": '49% COVID-19 cases were reported in last 5 days',
				"description": 'In the 10 days between March 10 and 20, the number of people in India who tested positive for COVID-19, the disease caused by novel coronavirus, jumped from 50 to 196. By March 25, it reached 606 and by the end of the month (March 31) India had 1,397 confirmed COVID-19 cases. Following this, the next five days saw a 120 per cent rise in COVID-19 cases in India, as by April 4 India had a total of 3,072 cases.',
				"source": 'https://www.indiatoday.in/india/story/coronavirus-cases-in-india-covid19-states-cities-affected-1653852-2020-03-09'
			}],
			"world": [{
				"heading": 'A German Exception? Why the Country’s Coronavirus Death Rate Is Low',
				"description": 'They might suggest hospitalization, even to a patient who has only mild symptoms; the chances of surviving that decline are vastly improved by being in a hospital when it begins.',
				"source": 'https://www.nytimes.com/2020/04/04/world/europe/germany-coronavirus-death-rate.html'
			}, {
				"heading": 'New York\'s Bronx Zoo Tiger Tests Positive For Coronavirus',
				"description": 'A tiger at New York\'s Bronx Zoo has tested positive for COVID-19, the institution said Sunday, and is believed to have contracted the virus from a caretaker who was asymptomatic at the time.',
				"source": 'https://www.ndtv.com/world-news/new-yorks-bronx-zoo-tiger-tests-positive-for-coronavirus-2206650'
			}, {
				"heading": 'Europe sees more signs of hope as Italy\'s virus curve falls',
				"description": 'Italy recorded 4,316 new cases Sunday. Earlier in the outbreak, daily increases in caseloads topped the 6,000 mark. A day shy of one month under a national lockdown that the Italian government ordered, the lower count of day-to-day deaths brought some encouragement.',
				"source": 'https://economictimes.indiatimes.com/news/international/world-news/europe-sees-more-signs-of-hope-as-italys-virus-curve-falls/articleshow/74999533.cms'
			}]
		}, {
			"date": '05 / 04 / 2020',
			"india": [{
				"heading": 'Lifeline Udan: No commercial traffic but Indian skies buzzing with cargo planes carrying COVID-19 essentials',
				"description": 'Though commercial flights stand suspended in India due to the COVID-19 lockdown, the skies are still buzzing with regular cargo flights to transport critical medical equipment and supplies.',
				"source": 'https://www.indiatoday.in/india/story/lifeline-udan-no-commercial-traffic-but-indian-skies-buzzing-with-cargo-planes-carrying-covid-19-essentials-1663665-2020-04-05'
			}, {
				"heading": 'India Curbs Diagnostic Testing Kit Exports As Coronavirus Spreads',
				"description": 'The government is restricting the export of most diagnostic testing kits, as coronavirus cases topped 3,350 on Sunday despite a three-week nationwide lockdown to slow the spread of the respiratory disease.',
				"source": 'https://www.ndtv.com/india-news/india-curbs-diagnostic-testing-kit-exports-as-coronavirus-spreads-2206527?amp=1&akamai-rum=off'
			}, {
				"heading": 'Railways Develop Low-Cost Ventilator "Jeevan", Seeks Top Medical Body\'s Approval',
				"description": 'The Indian Railways has developed a low-cost ventilator, Jeevan at its Kapurthala Rail Coal Factory that could save thousands of lives at a time the country is grappling with a shortage of the medical equipment in its fight against coronavirus. The prototype is now awaiting ICMR clearance to go into production, the Railways said.',
				"source": 'https://www.ndtv.com/india-news/railways-develops-low-cost-ventilator-jeevan-seeks-top-medical-bodys-approval-2206613'
			}],
			"world": [{
				"heading": 'Bangladesh PM unveils 72,750-crore taka economic package to counter adverse effects of coronavirus',
				"description": 'Bangladesh Prime Minister Sheikh Hasina on Sunday announced stimulus packages to the tune of Taka 72,750 crore (USD 8,573 million) to counter the adverse effects of coronavirus on the country\'s economy.',
				"source": 'https://www.indiatoday.in/coronavirus-outbreak/story/bangladesh-pm-unveils-72-750-crore-taka-economic-package-to-counter-adverse-effects-of-coronavirus-1663519-2020-04-05'
			}, {
				"heading": '5-Year-Old Is UK\'s Youngest Coronavirus Victim As Deaths Rise',
				"description": 'Britain on Saturday reported a record 708 daily deaths from COVID-19, including a five-year-old child, who is thought to be the country\'s youngest victim.',
				"source": 'https://www.ndtv.com/world-news/coronavirus-in-uk-child-5-announced-as-yougest-victim-as-virus-deaths-rise-record-high-in-uk-2206312'
			}, {
				"heading": 'China is encouraging herbal remedies to treat COVID-19. But scientists warn against it',
				"description": 'As China appears to emerge from the worst of its coronavirus outbreak, government officials are encouraging the use of traditional medicine for treatment and prevention — practice experts warned could give the public a false sense of security amid the pandemic.',
				"source": 'https://www.nbcnews.com/news/world/china-encouraging-herbal-remedies-treat-covid-19-scientists-warn-against-n1173041'
			}]
		}, {
			"date": '04 / 04 / 2020',
			"india": [{
				"heading": 'PM Modi, Donald Trump discuss India-US partnership to fight COVID-19 crisis',
				"description": 'Prime Minister Narendra Modi on Saturday said he had an extensive discussion on the COVID-19 crisis with US President Donald Trump over the phone. Mentioning that it was "a good discussion", PM Modi said India and the US have agreed to deploy the full strength of their partnership to fight the coronavirus pandemic.',
				"source": 'https://www.indiatoday.in/india/story/pm-modi-donald-trump-discuss-india-us-partnership-to-fight-covid-19-crisis-1663342-2020-04-04'
			}, {
				"heading": 'More than 1500 participated in feast thrown by a family whose 11 members were tested positive in MP\'s Morena district',
				"description": 'Cheif medical and health officer Morena, Dr RC Badil said: "On Friday evening we came to know that the patient who had come from Dubai after her mother\'s death had thrown a funeral feast where between 1500- and 2000 people from villages across five blocks had participated".',
				"source": 'https://timesofindia.indiatimes.com/city/bhopal/coronavirus-more-than-1500-participated-in-feast-thrown-by-family-whose-11-members-were-tested-positive-in-mps-morena-district/articleshow/74981994.cms'
			}, {
				"heading": 'IAF official, who was present in Nizamuddin during Jamaat meet, under quarantine, say sources',
				"description": 'Sources in the government said on Saturday that an Indian Air Force (IAF) official, who was present in Delhi\'s Nizamuddin area during the Tablighi Markaz congregation last month, has put himself under quarantine as a precautionary measure.',
				"source": 'https://www.indiatoday.in/india/story/coronavirus-iaf-official-present-nizamuddin-tabhliqi-jamaat-meet-quarantine-govt-sources-1663400-2020-04-04'
			}],
			"world": [{
				"heading": 'COVID-19: US Records Highest Single-Day Death Toll With 1,480 Deaths',
				"description": 'With 1,480 deaths counted between Thursday and Friday, according to the university\'s, the total number of people who succumbed to the pandemic in the United States has now touched 7,406.',
				"source": 'https://news.abplive.com/health/covid19-us-single-day-death-toll-touches-1480-in-a-day-1189279'
			}, {
				"heading": 'Britain unlikely to lift lockdown until end of May: Government expert',
				"description": 'The government has put Britain into a widespread shutdown, closing pubs, restaurants and nearly all shops, while ordering people to stay home unless absolutely essential to venture out.',
				"source": 'https://www.indiatoday.in/world/story/coronavirus-uk-lockdown-1663294-2020-04-04'
			}, {
				"heading": 'Italy Daily Virus Fatalities Fall to 681, Lowest Since March 26',
				"description": 'The daily toll was the lowest since March 26 and fell from 766 Friday, according to civil protection data. There were 4,805 new confirmed cases, an increase from 4585 a day earlier.',
				"source": 'https://www.bloomberg.com/news/articles/2020-04-04/italy-daily-virus-fatalities-fall-to-681-lowest-since-march-26'
			}]
		}, {
			"date": '03 / 04 / 2020',
			"india": [{
				"heading": 'World Bank commits US$1 billion to help India fight COVID-19',
				"description": 'The World Bank has committed US$1 billion to help India expand its laboratory capacity in the fight against COVID-19, a highly contagious viral infection caused by SARS-CoV-2. The fund will also be used to ensure that medical staff across the country are well-equipped and well-trained to give emergency care.',
				"source": 'https://www.firstpost.com/health/world-bank-commits-us1-billion-to-help-india-fight-covid-19-8223951.html'
			}, {
				"heading": '11 CISF jawans test positive for COVID-19 in Mumbai',
				"description": 'The Central Industrial Security Force (CISF) Friday said as many as 11 of its jawans posted at Mumbai airport have tested positive for coronavirus, news agency ANI reported.',
				"source": 'https://www.livemint.com/news/india/coronavirus-update-11-cisf-jawans-test-positive-for-covid-19-in-mumbai-11585924292310.html'
			}, {
				"heading": 'Light candles, diyas at 9 pm this Sunday to mark coronavirus fight: PM Narendra Modi',
				"description": 'Prime Minister Narendra Modi has asked Indians under lockdown to switch off all lights at home at 9 pm Sunday (April 5) and light candles or diyas -- or use the flashlights on their mobile phones -- to mark the national fight against the coronavirus outbreak.',
				"source": 'https://www.indiatoday.in/india/story/pm-narendra-modi-on-coronavirus-lockdown-1662747-2020-04-03'
			}],
			"world": [{
				"heading": 'Stores, shopping malls reopen in Wuhan as city gradually revives from coronavirus outbreak',
				"description": 'Shopkeepers in Wuhan, the city at the center of the coronavirus outbreak, were reopening Monday, but customers were scarce after authorities lifted more of the anti-virus controls that kept tens of millions of people at home for two months.',
				"source": 'https://www.usatoday.com/story/money/2020/03/30/wuhan-stores-shopping-malls-reopen-after-weeks-battling-coronavirus/5087115002/'
			}, {
				"heading": 'Is A Potential Coronavirus Vaccine Around The Corner? Pittsburgh Scientists Claim So',
				"description": 'The wait for a vaccine for coronavirus may end soon as researchers from the University of Pittsburgh School of Medicine announce successful testing of a vaccine on lab mice.',
				"source": 'https://news.abplive.com/news/world/covid-19-vaccine-coronavirus-cure-treatment-corona-test-potential-vaccine-on-the-horizon-1188166'
			}, {
				"heading": 'Italy starts antibody testing to find people who have developed coronavirus immunity',
				"description": 'The Veneto region, which includes Venice, plans to test 100,000 doctors and nurses and then roll out the tests to the general population. Experts there are using a test that costs around €10 (£8.80) and delivers a result in an hour, making mass testing feasible.',
				"source": 'https://www.telegraph.co.uk/news/2020/04/03/italy-starts-antibody-testing-immune-covid-19/'
			}]
		}, {
			"date": '02 / 04 / 2020',
			"india": [{
				"heading": 'India may go for \'staggered\' exit post 21-day COVID lockdown, PM asks states to come up with a plan',
				"description": 'Pitching for efforts on a war footing to identify and isolate COVID-19 hotspots, Prime Minister Narendra Modi on Thursday hinted at a "staggered" exit from the ongoing lockdown after the 21-day period ends on April 14.',
				"source": 'https://economictimes.indiatimes.com/news/politics-and-nation/india-may-go-for-staggered-exit-post-21-day-covid-lockdown-pm-asks-states-to-come-up-with-a-plan/articleshow/74954054.cms'
			}, {
				"heading": 'Islamic cleric issues \'fatwa\' asking Muslims to get tested for coronavirus',
				"description": 'A leading Islamic cleric on Thursday issued a fatwa (religious edict) asking Muslims to get tested for coronavirus if they show symptoms of the disease and undergo treatment.',
				"source": 'https://www.indiatoday.in/india/story/islamic-cleric-lucknow-issues-fatwa-asking-muslims-to-get-tested-coronavirus-1662674-2020-04-02'
			}, {
				"heading": 'India\'s toaster-sized ventilator to help in a fight against the virus',
				"description": 'Originally created by a robot scientist and a neurosurgeon to help India\'s poor, a toaster-sized ventilator is offering hope in the country\'s fight against the coronavirus pandemic, and demand for it is booming.',
				"source": 'https://www.aljazeera.com/news/2020/04/india-toaster-sized-ventilator-fight-virus-200402090302355.html'
			}],
			"world": [{
				"heading": '100-Year Old Tuberculosis Vaccine A Potential New Tool To Fight Against COVID-19',
				"description": 'A century-old tuberculosis vaccine could be a protective measure against COVID-19, according to some reports. The researchers at the Murdoch Children\'s Research Institute are going to conduct a trial of the Bacillus Calmette–Guerin (BCG) vaccine with 4,000 health care professionals in hospitals around Australia to determine if it can reduce COVID-19 symptoms.',
				"source": 'https://news.abplive.com/health/tuberculosis-vaccine-for-coronavirus-study-covid-19-india-bcg-injection-1186651'
			}, {
				"heading": 'China reports 35 new imported coronavirus cases, six deaths',
				"description": 'China reported 35 new imported cases of the novel coronavirus while the death toll from the COVID1-9 infections increased to 3,318 after six more fatalities were confirmed on Wednesday from the virus hit Hubei province, health officials said on Thursday.',
				"source": 'https://timesofindia.indiatimes.com/world/china/china-reports-35-new-imported-coronavirus-cases-six-deaths/articleshow/74949234.cms'
			}, {
				"heading": 'Saudi Arabia imposes 24-hour curfew in Mecca and Medina',
				"description": 'Saudi Arabia imposed a 24-hour curfew in the Muslim holy cities of Mecca and Medina on Thursday, extending measures to combat the spread of the coronavirus, which has infected more than 1,700 people in the kingdom and killed 16.',
				"source": 'https://timesofindia.indiatimes.com/world/middle-east/saudi-arabia-imposes-24-hour-curfew-in-mecca-and-medina/articleshow/74950560.cms'
			}]
		}, {
			"date": '01 / 04 / 2020',
			"india": [{
				"heading": 'India\'s confirmed coronavirus cases breach 1,800-mark, death toll at 41',
				"description": 'The country has reported 1,834 confirmed Covid-19 cases so far, since the first case was reported on 30 January in Kerala\'s Thrissur. ',
				"source": 'https://www.livemint.com/news/india/india-s-confirmed-coronavirus-cases-breach-1-800-mark-death-toll-at-41-here-s-state-wise-tally-11585742867547.html'
			}, {
				"heading": 'IAF aircraft to deliver medical equipment to Maldives',
				"description": 'As per official sources, "An Indian Air Force C-130J Super Hercules transport aircraft will take off with medical equipment and other supplies to the Maldives. The material is being sent as the Government of India wants to assist its neighbours in fight against [novel] coronavirus."',
				"source": 'https://www.indiatoday.in/india/story/iaf-aircraft-to-deliver-medical-equipment-to-maldives-1662309-2020-04-01'
			}, {
				"heading": '71 people from West Bengal who attended Nizamuddin congregation identified says CM',
				"description": 'West Bengal chief minister Mamata Banerjee on Wednesday said her government has identified 71 people who had attended the Tablighi Jamaat congregation in Delhi\'s Nizamuddin. Banerjee said 54 people from that group have been sent into quarantine.',
				"source": 'https://timesofindia.indiatimes.com/city/kolkata/71-people-from-west-bengal-who-attended-nizamuddin-congregation-identified-cm/articleshow/74934727.cms'
			}],
			"world": [{
				"heading": 'China starts to report asymptomatic coronavirus cases',
				"description": 'Asymptomatic infections would not cause a major outbreak if the transmission chain was cut, the Chinese government’s senior medical adviser, Zhong Nanshan, told state-run Shenzhen TV. He said that once asymptomatic infected people were found they would be isolated and their contacts isolated and kept under observation.',
				"source": 'https://economictimes.indiatimes.com/news/international/world-news/china-starts-to-report-asymptomatic-coronavirus-cases/articleshow/74925379.cms'
			}, {
				"heading": 'Pakistan’s coronavirus cases jump to 2,119',
				"description": 'The number of coronavirus cases in Pakistan climbed to 2,119 on Wednesday. So far, 27 people have died from the disease since the first Covid-19 death in the country was reported on March 18.',
				"source": 'https://timesofindia.indiatimes.com/world/pakistan/pakistans-coronavirus-cases-jump-to-2119/articleshow/74938353.cms'
			}, {
				"heading": 'Italy records lowest coronavirus death toll for a week',
				"description": 'Italy has extended its lockdown until 13 April but recorded its lowest death toll in more than a week, reinforcing indications that the coronavirus epidemic both there and in Spain may be reaching a plateau.',
				"source": 'https://www.theguardian.com/world/2020/apr/01/italy-extends-lockdown-amid-signs-coronavirus-infection-rate-is-easing'
			}]
		}, {
			"date": '31 / 03 / 2020',
			"india": [{
				"heading": 'Tamil Nadu reports 57 new Covid-19 cases in one day, 79% attended Tablighi Jamaat. State tally at 124',
				"description": '57 tested positive for coronavirus in Tamil Nadu on Tuesday with the total number rising to 124. 45 of the cases have links to the Tablighi Jamaat religious congregation held in Delhi\'s Nizamuddin West earlier this month.',
				"source": 'https://www.indiatoday.in/india/story/tamil-nadu-reports-57-new-covid-19-cases-in-one-day-79-attended-tablighi-jamaat-state-tally-at-124-1661904-2020-03-31'
			}, {
				"heading": 'Strictly enforce lockdown along West Bengal border, says Mamata Banerjee',
				"description": 'Chief minister Mamata Banerjee on Monday called for the strictest enforcement of the lockdown along Bengal’s borders to keep migrant workers out of the state. ',
				"source": 'https://timesofindia.indiatimes.com/city/kolkata/strictly-enforce-lockdown-along-border-mamata/articleshow/74903031.cms'
			}, {
				"heading": 'Covid-19 outbreak; Etah jail releases 109 prisoners to reduce crowding',
				"description": 'After the directive of the Apex Court to decongest prisons in the wake of the Covid-19 virus outbreak, Etah jail in Uttar Pradesh has released 109 prisoners.',
				"source": 'https://timesofindia.indiatimes.com/videos/city/lucknow/covid-19-outbreak-etah-jail-releases-109-prisoners-to-reduce-crowding/videoshow/74919627.cms'
			}],
			"world": [{
				"heading": 'Indonesia declares state of emergency as virus toll jumps',
				"description": 'Widodo\'s administration has been heavily criticised for not imposing lockdowns in major cities, including the capital Jakarta, a vast megalopolis home to about 30 million people where most of the country\'s virus deaths have been reported.',
				"source": 'https://timesofindia.indiatimes.com/world/rest-of-world/indonesia-declares-state-of-emergency-as-virus-toll-jumps/articleshow/74914100.cms'
			}, {
				"heading": '101-year-old Italian man, born amid Spanish flu pandemic, survives coronavirus illness, official says',
				"description": 'A 101-year-old Italian man has reportedly survived his battle with COVID-19, the disease caused by the new coronavirus spreading around the globe. An official from the city of Rimini on the northeast coast of Italy says the man, identified publicly as only Mr. P., was released from the hospital earlier this week.',
				"source": 'https://www.usatoday.com/story/news/world/2020/03/27/italy-101-year-old-born-during-spanish-flu-survives-coronavirus/2926073001/'
			}, {
				"heading": 'The world economy, except India, China, will go into recession due to Covid-19; UN',
				"description": '"Even so, the world economy will go into recession this year with a predicted loss of global income in trillions of dollars. This will spell serious trouble for developing countries, with the likely exception of China and the possible exception of India," the UNCTAD said.',
				"source": 'https://www.livemint.com/news/india/world-economy-will-go-into-recession-due-to-coronavirus-except-india-china-un-11585628604446.html'
			}]
		}, {
			"date": '30 / 03 / 2020',
			"india": [{
				"heading": 'India to procure ventilators, PPE kits from China, not testing kits',
				"description": 'A statement by the Ministry of Health and Family Welfare in a press release said, "Indian Red Cross Society has arranged 10,000 PPEs from China which have also been received and are being distributed.',
				"source": 'https://www.indiatoday.in/india/story/india-to-procure-ventilators-ppe-kits-from-china-not-testing-kits-1661495-2020-03-30'
			}, {
				"heading": 'Delhi govt schools to promote all students till class 8, start online classes',
				"description": 'With schools shut to curb the spread of Covid-19, the Aam Aadmi Party (AAP) led Delhi government on Monday announced that all students from nursery to class eight will be promoted without exams.',
				"source": 'https://www.livemint.com/news/india/delhi-government-schools-to-start-classes-through-sms-ivr-and-online-11585574177962.html'
			}, {
				"heading": 'Johnson & Johnson plans to start a human trial of COVID-19 vaccine by Sept',
				"description": 'US-based global healthcare company Johnson & Johnson on Monday announced the selection of a lead COVID-19 vaccine candidate, adding that it expects to initiate testing of the vaccine in humans at the latest by September this year.',
				"source": 'https://timesofindia.indiatimes.com/india/johnson-johnson-plans-to-start-human-trial-of-covid-19-vaccine-by-sept/articleshow/74898716.cms'
			}],
			"world": [{
				"heading": 'Spain passes China in coronavirus infections as world struggles with containment',
				"description": 'With a population of only 47 million to China’s 1.4 billion, Spain’s tally of infections reached 85,195 on Monday, a rise of 8 per cent from the previous day. Spain also reported 812 new deaths in the last day, raising its overall fatalities from the virus to 7,300.',
				"source": 'https://globalnews.ca/news/6749456/coronavirus-spain-china-cases/'
			}, {
				"heading": 'UN calls for $2.5tn emergency package for developing nations',
				"description": 'The United Nations has called for a $2.5tn emergency package to help developing countries cope with the crippling impact of the Covid-19 pandemic on their vulnerable economies.',
				"source": 'https://www.theguardian.com/world/2020/mar/30/un-calls-trillion-emergency-package-help-developing-nations-coronavirus'
			}, {
				"heading": 'Donald Trump extends Covid-19 guidelines, braces the US for big death toll',
				"description": 'Bracing the nation for a coronavirus death toll that could exceed 100,000 people, President Donald Trump extended restrictive social distancing guidelines through April, bowing to public health experts who presented him with even more dire projections for the expanding coronavirus pandemic.',
				"source": 'https://timesofindia.indiatimes.com/world/us/donald-trump-trump-extends-covid-19-guidelines-braces-us-for-big-death-toll/articleshow/74895896.cms'
			}]
		}, {
			"date": "29 / 03 / 2020",
			"india": [{
				"heading": 'Coronavirus crisis; 69-year-old dies in Kerala',
				"description": 'Kerala recorded the first death of a coronavirus patient when a 69-year-old man died at the government medical college hospital in Ernakulam on Saturday.',
				"source": 'https://www.telegraphindia.com/india/coronavirus-crisis-69-year-old-dies-in-kerala/cid/1760124?ref=more-from-india_india-page'
			}, {
				"heading": '49-day lockdown necessary to stop coronavirus resurgence in India: Study',
				"description": 'Two Indian-origin researchers from the University of Cambridge in the UK have come up with a new mathematical model that predicts a flat 49-day nationwide lockdown -- or sustained lockdown with periodic relaxation extending over two months -- may be necessary to prevent Covid-19 resurgence in India.',
				"source": 'https://www.business-standard.com/article/current-affairs/49-day-lockdown-necessary-to-stop-coronavirus-resurgence-in-india-study-120032900487_1.html'
			}, {
				"heading": 'Mann ki baat: PM Modi asks nation to forgive him for hardships faced during coronavirus lockdown',
				"description": 'Addressing the nation through the Mann ki Baat program, Prime Minister Narendra Modi sought forgiveness from the country for the difficult decision of imposing a coronavirus lockdown that caused hardships to people, especially poor.',
				"source": 'https://www.indiatoday.in/india/story/mann-ki-baat-pm-modi-asks-nation-to-forgive-him-for-hardships-faced-during-coronavirus-lockdown-1660911-2020-03-29'
			}],
			"world": [{
				"heading": 'Princess Maria Teresa of Spain becomes first royal to die from coronavirus',
				"description": 'Spanish Princess Maria Teresa of Bourbon-Parma has become the first royal to pass away due to novel coronavirus complications.',
				"source": 'https://www.indiatoday.in/india/video/princess-maria-teresa-of-spain-becomes-first-royal-to-die-from-coronavirus-1660947-2020-03-29'
			}, {
				"heading": 'German State Finance Minister Kills Himself As Coronavirus Hits Economy',
				"description": 'Thomas Schaefer, 54, was found dead near a railway track on Saturday. The Wiesbaden prosecution\'s office said they believe he died by suicide.',
				"source": 'https://www.ndtv.com/world-news/coronavirus-outbreak-german-minister-thomas-schaefer-kills-self-being-worried-about-coronavirus-econ-2202639'
			}, {
				"heading": '57-year-old Wuhan market shrimp seller may be Covid-19 patient zero; Report',
				"description": 'A shrimp seller at the wet market in the Chinese city of Wuhan believed to be the centre of the coronavirus pandemic, maybe the first person to have tested positive for the disease, a media report said on Saturday.',
				"source": 'https://www.livemint.com/news/world/57-year-old-wuhan-market-shrimp-seller-may-be-covid-19-patient-zero-report-11585396304490.html'
			}]
		}, {
			"date": "28 / 03 / 2020",
			"india": [{
				"heading": 'India\'s confirmed coronavirus cases cross 900-mark, death toll at 19: Here\'s state-wise tally',
				"description": 'The number of confirmed coronavirus cases in India rose to 918 on Saturday, according to the Ministry of Health and Family Welfare.',
				"source": 'https://www.livemint.com/news/india/india-s-confirmed-coronavirus-cases-cross-900-mark-death-toll-at-19-11585388629458.html'
			}, {
				"heading": 'Delhi govt to feed 4 lakh people from tomorrow; ready for even 1,000 cases a day, says Kejriwal',
				"description": '“At the moment, the Delhi government is feeding 20,000 people at 224 night shelters. We have increased the number of such facilities; food will now also be provided at 325 schools which are currently shut,” Mr Kejriwal said.',
				"source": 'https://www.thehindu.com/news/cities/Delhi/coronavirus-delhi-to-feed-4-lakh-people-from-tomorrow-ready-for-even-1000-cases-a-day-says-kejriwal/article31180118.ece'
			}, {
				"heading": 'The woman behind India\'s first testing kit; Virologist delivered kit, then her baby',
				"description": '"It was an emergency, so I took this on as a challenge. I have to serve my nation," she says, adding that her team of 10 worked "very hard" to make the project a success.',
				"source": 'https://www.bbc.com/news/world-asia-india-52064427'
			}],
			"world": [{
				"heading": 'Plea for Iran pilgrim evacuation',
				"description": 'The petitioner has claimed that around 250 pilgrims holed up in a makeshift camp are suspected to have contracted the coronavirus but they had not been isolated, jeopardising their compatriots.',
				"source": 'https://www.telegraphindia.com/india/plea-for-iran-pilgrim-evacuation/cid/1759869?ref=more-from-india_india-page'
			}, {
				"heading": 'Australia records 3,400 cases of Covid-19 with median age of 48 – as it happened',
				"description": 'Australia’s total cases of Covid-19 have risen to 3,400. The median age is 48, and 67% are linked to travel.',
				"source": 'https://www.theguardian.com/australia-news/live/2020/mar/28/coronavirus-australia-live-nsw-qld-victoria-lockdown-restrictions-quarantine-ventilators-latest-updates'
			}, {
				"heading": 'New Wuhan problem; cremating thousands',
				"description": 'As the virus ravaged Wuhan — killing more than 2,500 people, according to official figures — the city was kept under a strict lockdown for more than two months, and residents were barred from holding funerals.',
				"source": 'https://www.telegraphindia.com/world/new-wuhan-problem-cremating-thousands/cid/1759750?ref=world_world-page'
			}]
		}, {
			"date": "27 / 03 / 2020",
			"india": [{
				"icon": "news-icon.svg",
				"heading": 'Coronavirus outbreak, 10-month-old tests positive in Karnata',
				"description": 'A 10-month-old tested positive for coronavirus in Karnataka on Friday. Apart from him, six others have also tested positive for the contagious virus, taking the state toll to 62.',
				"source": 'https://bangaloremirror.indiatimes.com/bangalore/others/coronavirus-outbreak-10-month-old-tests-positive-in-karnataka/articleshow/74845429.cms'
			}, {
				"icon": "news-icon.svg",
				"heading": 'India to participate in WHO "solidarity trial", says government',
				"description": 'India is soon likely to participate in the WHO\'s "solidarity trial" for developing potential drugs for COVID-19, officials said on Friday.',
				"source": 'https://timesofindia.indiatimes.com/india/coronavirus-latest-updates-indian-army-code-names-anti-covid-19-effort-operation-namaste/articleshow/74839029.cms'
			}, {
				"icon": "news-icon.svg",
				"heading": 'RBI allows 3-month moratorium on EMIs, cuts repo rate by 75 basis points',
				"description": 'The RBI has allowed banks to provide a 3-month moratorium on loans and EMI repayments. It has also slashed key repo rate by 75 basis points to 4.4 per cent in order to revive growth as India battles Covid-19.',
				"source": 'https://www.indiatoday.in/business/story/coronavirus-in-india-rbi-reduces-key-repo-rate-by-75-basis-points-to-4-4-percent-to-revive-growth-amid-crisis-1660207-2020-03-27'
			}],
			"world": [{
				"icon": "news-icon.svg",
				"heading": 'British Prime Minister Boris Johnson tests positive for coronavirus',
				"description": 'British Prime Minister Boris Johnson said on Friday he had tested positive for coronavirus and was self-isolating at Downing Street but would still lead the government\'s response to the accelerating outbreak.',
				"source": 'https://timesofindia.indiatimes.com/world/uk/british-prime-minister-boris-johnson-tests-positive-for-coronavirus/articleshow/74847519.cms'
			}, {
				"icon": "news-icon.svg",
				"heading": 'Hungary orders two-week lockdown to fight coronavirus',
				"description": 'Hungarian Prime Minister Viktor Orban on Friday ordered a nationwide lockdown for two weeks to fight the spread of the new coronavirus. "We are introducing curfew restrictions throughout Hungary between March 28 and April 11," he told on public radio.',
				"source": 'https://timesofindia.indiatimes.com/world/europe/hungary-orders-two-week-lockdown-to-fight-coronavirus/articleshow/74847460.cms'
			}, {
				"icon": "news-icon.svg",
				"heading": 'Hundreds killed in Iran over false belief that poison kills coronavirus',
				"description": 'Iranian media reports nearly 300 people have been killed and more than 1,000 sickened so far by ingesting methanol across the Islamic Republic, where drinking alcohol is banned and where those who do rely on bootleggers.',
				"source": 'https://www.thehindu.com/news/international/a-false-belief-that-poison-fights-coronavirus-kills-hundreds-in-iran/article31181492.ece'
			}]
		}, {
			"date": "26 / 03 / 2020",
			"india": [{
				"icon": "news-icon.svg",
				"heading": "India announces $22.5 billion stimulus package to help those affected by the lockdown",
				"description": "India announced an economic stimulus package worth 1.7 trillion rupees ($22.5 billion) on Thursday, designed to help millions of low-income households cope with a 21-day lockdown due to the coronavirus outbreak. The package will be disbursed through food security measures for poor households and through direct cash transfers, said India’s Finance Minister Nirmala Sitharaman.",
				"source": "https://www.cnbc.com/2020/03/26/coronavirus-india-needs-a-support-package-larger-than-20-billion-dollars.html"
			}, {
				"icon": "news-icon.svg",
				"heading": "PM Modi pitches for new crisis management protocol at G20 video conference on coronavirus",
				"description": "As the world reels under the coronavirus pandemic, Prime Minister Narendra Modi on Thursday urged the powerful G20 grouping to put human beings rather than economic targets at the centre of the vision for global prosperity and cooperation.",
				"source": "https://timesofindia.indiatimes.com/india/pm-modi-pitches-for-new-crisis-management-protocol-at-g20-video-conference-on-coronavirus/articleshow/74835011.cms"
			}, {
				"icon": "news-icon.svg",
				"heading": "Total Covid-19 Cases Reach 694 Amid Lockdown, 16 Dead",
				"description": "India today said that they are noticing a stabilisation in the rate of new infections across the country as total cases of Covid-19 rose to 649. While there is a general decline in the number of new cases detected, this is not the time yet to be relaxed about the situation, joint health secretary Luv Agarwal said in a press conference. 'We are in the local transmission stage currently. We will notify if we find traces of community transmission.'",
				"source": "https://bloombergquint.com/coronavirus-outbreak/coronavirus-india-updates-total-covid-19-cases-reach-606-amid-lockdown-10-dead"
			}],
			"world": [{
				"icon": "news-icon.svg",
				"heading": "FBI agents kill man allegedly plotting bomb attack on hospital amid coronavirus pandemic",
				"description": "A man fatally injured by the FBI was planning a bomb attack on a medical facility in the Kansas City area, the agency said in a news release on Wednesday.",
				"source": "https://www.theguardian.com/us-news/2020/mar/26/hospital-bomb-attack-man-killed-fbi-agents-missouri"
			}, {
				"icon": "news-icon.svg",
				"heading": "Live updates: Coronavirus death toll in U.S. reaches 1,000; China suspends entry for foreigners with visas and residence permits",
				"description": "The U.S. death toll from the coronavirus has hit 1,000, according to tracking by The Washington Post, a toll that is increasing at an alarming rate. New patterns have emerged in the spread of the virus, according to analysis by The Washington Post of every known U.S. death.",
				"source": "https://www.washingtonpost.com/world/2020/03/26/coronavirus-latest-news/"
			}, {
				"icon": "news-icon.svg",
				"heading": "Senate approves historic $2 trillion stimulus deal amid growing coronavirus fears",
				"description": " $2 trillion stimulus package to provide a jolt to an economy reeling from the coronavirus pandemic, capping days of intense negotiations that produced one of the most expensive and far-reaching measures Congress has ever considered.",
				"source": "https://edition.cnn.com/2020/03/25/politics/stimulus-senate-action-coronavirus/index.html"
			}]
		}, {
			"date": "25 / 03 / 2020",
			"india": [{
				"icon": "news-icon.svg",
				"heading": "United Nations stands in solidarity with India in its fight against COVID-19",
				"description": "The UN has expressed solidarity with India in its fight against coronavirus, with a top official at the world body's health agency praising Prime Minister Narendra Modi's 21-day nationwide lockdown as a 'comprehensive and robust' response to the raging COVID-19 pandemic. Globally, the death toll from the coronavirus has risen to 18,915 with more than 422,900 cases reported in over 165 countries and territories, according to data from Johns Hopkins University.",
				"source": "https://www.livemint.com/news/india/india-lockdown-is-a-robust-response-to-coronavirus-who-11585113025825.html"
			}, {
				"icon": "news-icon.svg",
				"heading": "How will India lockdown playout for economy & markets: 4 scenarios",
				"description": "The first two rounds of coronavirus outbreak have already wiped off Rs 52 lakh crore worth of equity investor wealth, with benchmarks Sensex and Nifty languishing at multi-year lows after falling 35 per cent from their January peaks.",
				"source": "https://economictimes.indiatimes.com/markets/stocks/news/how-will-india-lockdown-play-out-for-economy-markets-4-scenarios/articleshow/74804087.cms"
			}, {
				"icon": "news-icon.svg",
				"heading": "Mobile phone industry explores worldwide tracking of users",
				"description": "Until now the use of mobile phone tracking in the fight against Covid-19 has been restricted to national governments, which are either monitoring data within their borders or in discussions with mobile operators and technology companies about doing so. They include the US, India, Iran, Poland, Singapore, Israel and South Korea. The British government is engaged in talks with BT, the owner of the UK mobile operator EE, about using phone location and usage data to determine the efficacy of isolation orders.",
				"source": "https://www.theguardian.com/world/2020/mar/25/mobile-phone-industry-explores-worldwide-tracking-of-users-coronavirus"
			}],
			"world": [{
				"icon": "news-icon.svg",
				"heading": "US Lawyer Files $20 Trillion Lawsuit Against China For Coronavirus Outbreak",
				"description": 'Larry Klayman, his advocacy group Freedom Watch and Buzz Photos, a Texas company, filed the lawsuit in the US District Court for the Northern District of Texas, alleging that the novel coronavirus was "designed by China to be a biological weapon of war", and that whether or not the country intended to release it, China violated "US law, international laws, treaties, and norms."',
				"source": "https://www.ndtv.com/world-news/us-lawyer-files-20-trillion-lawsuit-against-china-for-coronavirus-outbreak-2199640"
			}, {
				"icon": "news-icon.svg",
				"heading": "Prince Charles Becomes First Member of Royal Family to Test Positive for Coronavirus",
				"description": 'Prince Charles, the 71-year-old heir to the British throne, has tested positive for coronavirus — the first member of the British royal family to have contracted the disease. “The Prince of Wales has tested positive for coronavirus. He has been displaying mild symptoms but otherwise remains in good health and has been working from home throughout the last few days as usual,” The prince’s Clarence House office said in a statement.',
				"source": "https://www.nationalreview.com/news/prince-charles-becomes-first-member-of-royal-family-to-test-positive-for-coronavirus/"
			}, {
				"icon": "news-icon.svg",
				"heading": "Spain surpasses China in coronavirus deaths: Live updates",
				"description": "Spain has recorded more than 700 deaths over the past 24 hours, surpassing China in the total death toll, making the country now second to only Italy.",
				"source": "https://www.aljazeera.com/news/2020/03/india-joins-coronavirus-lockdown-warns-live-updates-200325000843329.html"
			}]
		}];
	}
}
