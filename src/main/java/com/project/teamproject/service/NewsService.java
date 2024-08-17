package com.project.teamproject.service;

import com.project.teamproject.domain.entity.NewsEntity;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class NewsService {

    public List<NewsEntity> getNewsList() {
        List<NewsEntity> newsEntityList = new ArrayList<>();

        final String crawlingUrl = "https://news.naver.com/main/list.naver?mode=LS2D&mid=shm&sid1=102&sid2=255";
        Connection conn = Jsoup.connect(crawlingUrl);

        try {
            Document document = conn.get();
            Elements headlines = document.select(".type06_headline li");

            for (Element headline : headlines) {
                Element titleElement = headline.select("dt:not(.photo) a").first();
                Element linkElement = titleElement;
                Element summaryElement = headline.select("dd span.lede").first();
                Element imageElement = headline.select("dt.photo a img").first();

                String title = titleElement.text();
                String link = linkElement.attr("href");
                String summary = summaryElement.text();
                String image = imageElement != null ? imageElement.attr("src") : "이미지 없음";

                NewsEntity newsEntity = new NewsEntity();
                newsEntity.setTitle(title);
                newsEntity.setLink(link);
                newsEntity.setSummary(summary);

                newsEntity.setImage(image);

                newsEntityList.add(newsEntity);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return newsEntityList;
    }
}
