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
