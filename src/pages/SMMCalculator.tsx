import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const SMMCalculator = () => {
  const [platform, setPlatform] = useState('vk');
  const [budget, setBudget] = useState(80000);
  const [duration, setDuration] = useState(30);
  const [postsPerWeek, setPostsPerWeek] = useState(5);
  const [storiesPerDay, setStoriesPerDay] = useState(3);
  const [reelsPerWeek, setReelsPerWeek] = useState(2);
  const [targetAudience, setTargetAudience] = useState(50000);

  const platforms = {
    vk: { name: 'ВКонтакте', cpm: 150, er: 3.5, cpt: 25, color: 'text-blue-600' },
    instagram: { name: 'Instagram*', cpm: 250, er: 2.8, cpt: 35, color: 'text-pink-600' },
    telegram: { name: 'Telegram', cpm: 180, er: 4.2, cpt: 20, color: 'text-sky-600' },
    youtube: { name: 'YouTube', cpm: 300, er: 5.5, cpt: 50, color: 'text-red-600' },
  };

  const currentPlatform = platforms[platform as keyof typeof platforms];

  const contentBudget = budget * 0.4;
  const adsBudget = budget * 0.6;

  const totalPosts = Math.round((postsPerWeek * duration) / 7);
  const totalStories = storiesPerDay * duration;
  const totalReels = Math.round((reelsPerWeek * duration) / 7);

  const adImpressions = Math.round((adsBudget / currentPlatform.cpm) * 1000);
  const reach = Math.round(adImpressions * 0.7);
  const frequency = adImpressions / reach;
  
  const organicReach = totalPosts * targetAudience * (currentPlatform.er / 100);
  const totalReach = reach + organicReach;

  const engagement = Math.round(totalReach * (currentPlatform.er / 100));
  const clicks = Math.round(adImpressions * 0.025);
  const conversions = Math.round(clicks * 0.15);
  const cpt = adsBudget / clicks;
  const cpa = budget / conversions;

  const costPerPost = contentBudget / totalPosts;
  const followerGrowth = Math.round(totalReach * 0.02);

  const handleSaveCampaign = () => {
    toast.success('Настройки SMM-кампании сохранены!', {
      description: `Прогноз: ${(totalReach / 1000).toFixed(1)}K охват, ${engagement.toLocaleString('ru-RU')} вовлечений`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
      <nav className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-heading font-bold">
            <span className="text-gradient">Studio Kutuzova</span>
          </a>
          <Button asChild variant="ghost">
            <a href="/">
              <Icon name="ArrowLeft" className="mr-2" size={16} />
              Назад
            </a>
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              SMM <span className="text-gradient">Калькулятор</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Рассчитайте эффективность продвижения в социальных сетях с детальными KPI
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Settings" className="text-primary" size={24} />
                    Параметры кампании
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label>Платформа</Label>
                    <Select value={platform} onValueChange={setPlatform}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(platforms).map(([key, p]) => (
                          <SelectItem key={key} value={key}>
                            {p.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="flex gap-2 text-sm text-muted-foreground">
                      <span>CPM: {currentPlatform.cpm}₽</span>
                      <span>•</span>
                      <span>ER: {currentPlatform.er}%</span>
                      <span>•</span>
                      <span>CPT: {currentPlatform.cpt}₽</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Общий бюджет (₽)</Label>
                      <Input
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        className="w-32 text-right"
                      />
                    </div>
                    <Slider
                      value={[budget]}
                      onValueChange={([val]) => setBudget(val)}
                      min={20000}
                      max={500000}
                      step={10000}
                      className="w-full"
                    />
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="p-3 bg-primary/5 rounded-lg border">
                        <div className="text-muted-foreground mb-1">Контент (40%)</div>
                        <div className="font-bold text-primary">{contentBudget.toLocaleString('ru-RU')} ₽</div>
                      </div>
                      <div className="p-3 bg-secondary/5 rounded-lg border">
                        <div className="text-muted-foreground mb-1">Реклама (60%)</div>
                        <div className="font-bold text-secondary">{adsBudget.toLocaleString('ru-RU')} ₽</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Длительность (дней)</Label>
                      <Input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        className="w-32 text-right"
                      />
                    </div>
                    <Slider
                      value={[duration]}
                      onValueChange={([val]) => setDuration(val)}
                      min={7}
                      max={90}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Целевая аудитория (подписчики)</Label>
                      <Input
                        type="number"
                        value={targetAudience}
                        onChange={(e) => setTargetAudience(Number(e.target.value))}
                        className="w-32 text-right"
                      />
                    </div>
                    <Slider
                      value={[targetAudience]}
                      onValueChange={([val]) => setTargetAudience(val)}
                      min={5000}
                      max={500000}
                      step={5000}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="FileText" className="text-primary" size={24} />
                    Контент-план
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center gap-2">
                        <Icon name="Image" size={16} className="text-primary" />
                        Постов в неделю
                      </Label>
                      <Input
                        type="number"
                        value={postsPerWeek}
                        onChange={(e) => setPostsPerWeek(Number(e.target.value))}
                        className="w-24 text-right"
                      />
                    </div>
                    <Slider
                      value={[postsPerWeek]}
                      onValueChange={([val]) => setPostsPerWeek(val)}
                      min={1}
                      max={14}
                      step={1}
                      className="w-full"
                    />
                    <div className="text-sm text-muted-foreground">
                      Всего за период: {totalPosts} постов • ~{costPerPost.toFixed(0)}₽ за пост
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center gap-2">
                        <Icon name="Clock" size={16} className="text-secondary" />
                        Сторис в день
                      </Label>
                      <Input
                        type="number"
                        value={storiesPerDay}
                        onChange={(e) => setStoriesPerDay(Number(e.target.value))}
                        className="w-24 text-right"
                      />
                    </div>
                    <Slider
                      value={[storiesPerDay]}
                      onValueChange={([val]) => setStoriesPerDay(val)}
                      min={0}
                      max={10}
                      step={1}
                      className="w-full"
                    />
                    <div className="text-sm text-muted-foreground">
                      Всего за период: {totalStories} сторис
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center gap-2">
                        <Icon name="Video" size={16} className="text-accent" />
                        Reels/клипов в неделю
                      </Label>
                      <Input
                        type="number"
                        value={reelsPerWeek}
                        onChange={(e) => setReelsPerWeek(Number(e.target.value))}
                        className="w-24 text-right"
                      />
                    </div>
                    <Slider
                      value={[reelsPerWeek]}
                      onValueChange={([val]) => setReelsPerWeek(val)}
                      min={0}
                      max={7}
                      step={1}
                      className="w-full"
                    />
                    <div className="text-sm text-muted-foreground">
                      Всего за период: {totalReels} видео
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="BarChart3" className="text-primary" size={24} />
                    Ключевые показатели эффективности (KPI)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="reach" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="reach">Охваты</TabsTrigger>
                      <TabsTrigger value="engagement">Вовлечение</TabsTrigger>
                      <TabsTrigger value="conversion">Конверсии</TabsTrigger>
                    </TabsList>

                    <TabsContent value="reach" className="space-y-4 mt-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border">
                          <div className="text-sm text-muted-foreground mb-1">Показы (Impressions)</div>
                          <div className="text-2xl font-bold text-gradient">
                            {adImpressions.toLocaleString('ru-RU')}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">рекламные показы</div>
                        </div>

                        <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border">
                          <div className="text-sm text-muted-foreground mb-1">Охват (Reach)</div>
                          <div className="text-2xl font-bold text-primary">
                            {reach.toLocaleString('ru-RU')}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">уникальных пользователей</div>
                        </div>

                        <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border">
                          <div className="text-sm text-muted-foreground mb-1">Частота (Frequency)</div>
                          <div className="text-2xl font-bold text-secondary">
                            {frequency.toFixed(2)}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">показов на человека</div>
                        </div>

                        <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border">
                          <div className="text-sm text-muted-foreground mb-1">Органический охват</div>
                          <div className="text-2xl font-bold text-accent">
                            {organicReach.toLocaleString('ru-RU', { maximumFractionDigits: 0 })}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">через контент</div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-primary via-secondary to-accent p-[2px] rounded-lg">
                        <div className="bg-background/90 backdrop-blur-sm rounded-lg p-4">
                          <div className="text-center">
                            <div className="text-sm text-muted-foreground mb-1">Суммарный охват</div>
                            <div className="text-4xl font-bold text-gradient">
                              {(totalReach / 1000).toFixed(1)}K
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">Total Reach</div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="engagement" className="space-y-4 mt-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border">
                          <div className="text-sm text-muted-foreground mb-1">Вовлечений (Engagement)</div>
                          <div className="text-2xl font-bold text-gradient">
                            {engagement.toLocaleString('ru-RU')}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">лайки, комментарии, шеры</div>
                        </div>

                        <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border">
                          <div className="text-sm text-muted-foreground mb-1">ER (Engagement Rate)</div>
                          <div className="text-2xl font-bold text-primary">
                            {currentPlatform.er}%
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">от охвата</div>
                        </div>

                        <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border">
                          <div className="text-sm text-muted-foreground mb-1">Прирост подписчиков</div>
                          <div className="text-2xl font-bold text-secondary">
                            +{followerGrowth.toLocaleString('ru-RU')}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">~{(followerGrowth / duration).toFixed(0)}/день</div>
                        </div>

                        <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border">
                          <div className="text-sm text-muted-foreground mb-1">Активность</div>
                          <div className="text-2xl font-bold text-accent">
                            {((engagement / totalReach) * 100).toFixed(2)}%
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">engagement depth</div>
                        </div>
                      </div>

                      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Icon name="TrendingUp" className="text-primary flex-shrink-0 mt-1" size={20} />
                          <div className="text-sm">
                            <div className="font-medium mb-1">Прогноз роста</div>
                            <div className="text-muted-foreground">
                              За {duration} дней ожидается рост аудитории на {((followerGrowth / targetAudience) * 100).toFixed(1)}% 
                              ({followerGrowth.toLocaleString('ru-RU')} новых подписчиков)
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="conversion" className="space-y-4 mt-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border">
                          <div className="text-sm text-muted-foreground mb-1">Переходы (Clicks)</div>
                          <div className="text-2xl font-bold text-gradient">
                            {clicks.toLocaleString('ru-RU')}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">CTR: 2.5%</div>
                        </div>

                        <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border">
                          <div className="text-sm text-muted-foreground mb-1">CPT (Cost Per Traffic)</div>
                          <div className="text-2xl font-bold text-primary">
                            {cpt.toFixed(2)} ₽
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">за переход</div>
                        </div>

                        <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border">
                          <div className="text-sm text-muted-foreground mb-1">Конверсии</div>
                          <div className="text-2xl font-bold text-secondary">
                            {conversions.toLocaleString('ru-RU')}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">CR: 15%</div>
                        </div>

                        <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border">
                          <div className="text-sm text-muted-foreground mb-1">CPA (Cost Per Action)</div>
                          <div className="text-2xl font-bold text-accent">
                            {cpa.toFixed(0)} ₽
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">за заявку</div>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-4">
                          <div className="text-sm text-muted-foreground mb-1">CPM (Cost Per Mille)</div>
                          <div className="text-3xl font-bold text-gradient">
                            {currentPlatform.cpm} ₽
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">за 1000 показов</div>
                        </div>

                        <div className="bg-gradient-to-br from-secondary/10 to-accent/10 border border-secondary/20 rounded-lg p-4">
                          <div className="text-sm text-muted-foreground mb-1">Средний чек</div>
                          <div className="text-3xl font-bold text-gradient">
                            3,500 ₽
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">аренда студии</div>
                        </div>
                      </div>

                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Icon name="DollarSign" className="text-green-500 flex-shrink-0 mt-1" size={20} />
                          <div className="text-sm">
                            <div className="font-medium mb-1 text-green-600 dark:text-green-400">ROI Прогноз</div>
                            <div className="text-muted-foreground">
                              Прогнозируемая выручка: {(conversions * 3500).toLocaleString('ru-RU')} ₽ 
                              • ROI: {(((conversions * 3500) / budget - 1) * 100).toFixed(0)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-2 border-primary bg-gradient-to-br from-primary/10 to-secondary/10 sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="PieChart" className="text-primary" size={20} />
                    Сводка кампании
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg border">
                      <span className="text-sm text-muted-foreground">Платформа:</span>
                      <Badge className={currentPlatform.color} variant="outline">
                        {currentPlatform.name}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg border">
                      <span className="text-sm text-muted-foreground">Период:</span>
                      <span className="font-medium">{duration} дней</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg border">
                      <span className="text-sm text-muted-foreground">Бюджет:</span>
                      <span className="font-medium">{budget.toLocaleString('ru-RU')} ₽</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg border">
                      <span className="text-sm text-muted-foreground">Бюджет/день:</span>
                      <span className="font-medium">{(budget / duration).toLocaleString('ru-RU', { maximumFractionDigits: 0 })} ₽</span>
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-3">
                    <div className="text-sm font-medium text-muted-foreground mb-2">Контент:</div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Icon name="Image" size={14} />
                        Посты:
                      </span>
                      <span className="font-medium">{totalPosts} шт</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Icon name="Clock" size={14} />
                        Сторис:
                      </span>
                      <span className="font-medium">{totalStories} шт</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Icon name="Video" size={14} />
                        Reels:
                      </span>
                      <span className="font-medium">{totalReels} шт</span>
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-3">
                    <div className="text-sm font-medium text-muted-foreground mb-2">Прогноз KPI:</div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Охват:</span>
                        <span className="font-bold text-primary">{(totalReach / 1000).toFixed(1)}K</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Вовлечения:</span>
                        <span className="font-bold text-secondary">{(engagement / 1000).toFixed(1)}K</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Переходы:</span>
                        <span className="font-bold text-accent">{clicks}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Заявки:</span>
                        <span className="font-bold text-gradient">{conversions}</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full" size="lg" onClick={handleSaveCampaign}>
                    <Icon name="Save" className="mr-2" size={20} />
                    Сохранить настройки
                  </Button>

                  <a 
                    href="https://c90bc39d-4747-4b90-a372-760fa36b705f.poehali.app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="outline" className="w-full" size="lg">
                      <Icon name="ExternalLink" className="mr-2" size={20} />
                      Открыть сайт студии
                    </Button>
                  </a>

                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" size="sm" asChild>
                      <a href="/targeting">
                        <Icon name="Target" className="mr-2" size={16} />
                        Таргетинг
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href="/calculator">
                        <Icon name="Calculator" className="mr-2" size={16} />
                        Калькулятор
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Lightbulb" className="text-accent" size={20} />
                    Рекомендации
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  {frequency < 2 && (
                    <div className="flex gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <Icon name="Info" className="text-blue-500 flex-shrink-0" size={18} />
                      <div>
                        <div className="font-medium text-blue-600 dark:text-blue-400 mb-1">Низкая частота</div>
                        <div className="text-muted-foreground text-xs">Увеличьте бюджет для лучшего запоминания бренда</div>
                      </div>
                    </div>
                  )}

                  {frequency > 5 && (
                    <div className="flex gap-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                      <Icon name="AlertCircle" className="text-amber-500 flex-shrink-0" size={18} />
                      <div>
                        <div className="font-medium text-amber-600 dark:text-amber-400 mb-1">Высокая частота</div>
                        <div className="text-muted-foreground text-xs">Риск баннерной слепоты, расширьте аудиторию</div>
                      </div>
                    </div>
                  )}

                  {postsPerWeek < 3 && (
                    <div className="flex gap-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                      <Icon name="AlertCircle" className="text-amber-500 flex-shrink-0" size={18} />
                      <div>
                        <div className="font-medium text-amber-600 dark:text-amber-400 mb-1">Мало контента</div>
                        <div className="text-muted-foreground text-xs">Для роста публикуйте минимум 3-5 постов в неделю</div>
                      </div>
                    </div>
                  )}

                  {currentPlatform.er > 4 && postsPerWeek >= 5 && (
                    <div className="flex gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <Icon name="CheckCircle" className="text-green-500 flex-shrink-0" size={18} />
                      <div>
                        <div className="font-medium text-green-600 dark:text-green-400 mb-1">Отличная стратегия!</div>
                        <div className="text-muted-foreground text-xs">Высокий ER и регулярный контент дают максимальный эффект</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-muted-foreground">
            * Instagram признан экстремистской организацией на территории РФ
          </div>
        </div>
      </div>
    </div>
  );
};

export default SMMCalculator;