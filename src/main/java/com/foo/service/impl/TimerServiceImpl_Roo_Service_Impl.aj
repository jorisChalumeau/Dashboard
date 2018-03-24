// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.foo.service.impl;

import com.foo.domain.Timer;
import com.foo.repository.TimerRepository;
import com.foo.service.impl.TimerServiceImpl;
import io.springlets.data.domain.GlobalSearch;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

privileged aspect TimerServiceImpl_Roo_Service_Impl {
    
    declare @type: TimerServiceImpl: @Service;
    
    declare @type: TimerServiceImpl: @Transactional(readOnly = true);
    
    /**
     * TODO Auto-generated attribute documentation
     * 
     */
    private TimerRepository TimerServiceImpl.timerRepository;
    
    /**
     * TODO Auto-generated constructor documentation
     * 
     * @param timerRepository
     */
    @Autowired
    public TimerServiceImpl.new(TimerRepository timerRepository) {
        setTimerRepository(timerRepository);
    }

    /**
     * TODO Auto-generated method documentation
     * 
     * @return TimerRepository
     */
    public TimerRepository TimerServiceImpl.getTimerRepository() {
        return timerRepository;
    }
    
    /**
     * TODO Auto-generated method documentation
     * 
     * @param timerRepository
     */
    public void TimerServiceImpl.setTimerRepository(TimerRepository timerRepository) {
        this.timerRepository = timerRepository;
    }
    
    /**
     * TODO Auto-generated method documentation
     * 
     * @param timer
     */
    @Transactional
    public void TimerServiceImpl.delete(Timer timer) {
        getTimerRepository().delete(timer);
    }
    
    /**
     * TODO Auto-generated method documentation
     * 
     * @param entities
     * @return List
     */
    @Transactional
    public List<Timer> TimerServiceImpl.save(Iterable<Timer> entities) {
        return getTimerRepository().save(entities);
    }
    
    /**
     * TODO Auto-generated method documentation
     * 
     * @param ids
     */
    @Transactional
    public void TimerServiceImpl.delete(Iterable<Long> ids) {
        List<Timer> toDelete = getTimerRepository().findAll(ids);
        getTimerRepository().deleteInBatch(toDelete);
    }
    
    /**
     * TODO Auto-generated method documentation
     * 
     * @param entity
     * @return Timer
     */
    @Transactional
    public Timer TimerServiceImpl.save(Timer entity) {
        return getTimerRepository().save(entity);
    }
    
    /**
     * TODO Auto-generated method documentation
     * 
     * @param id
     * @return Timer
     */
    public Timer TimerServiceImpl.findOne(Long id) {
        return getTimerRepository().findOne(id);
    }
    
    /**
     * TODO Auto-generated method documentation
     * 
     * @param id
     * @return Timer
     */
    public Timer TimerServiceImpl.findOneForUpdate(Long id) {
        return getTimerRepository().findOneDetached(id);
    }
    
    /**
     * TODO Auto-generated method documentation
     * 
     * @param ids
     * @return List
     */
    public List<Timer> TimerServiceImpl.findAll(Iterable<Long> ids) {
        return getTimerRepository().findAll(ids);
    }
    
    /**
     * TODO Auto-generated method documentation
     * 
     * @return List
     */
    public List<Timer> TimerServiceImpl.findAll() {
        return getTimerRepository().findAll();
    }
    
    /**
     * TODO Auto-generated method documentation
     * 
     * @return Long
     */
    public long TimerServiceImpl.count() {
        return getTimerRepository().count();
    }
    
    /**
     * TODO Auto-generated method documentation
     * 
     * @param globalSearch
     * @param pageable
     * @return Page
     */
    public Page<Timer> TimerServiceImpl.findAll(GlobalSearch globalSearch, Pageable pageable) {
        return getTimerRepository().findAll(globalSearch, pageable);
    }
    
    /**
     * TODO Auto-generated method documentation
     * 
     * @param ids
     * @param globalSearch
     * @param pageable
     * @return Page
     */
    public Page<Timer> TimerServiceImpl.findAllByIdsIn(List<Long> ids, GlobalSearch globalSearch, Pageable pageable) {
        return getTimerRepository().findAllByIdsIn(ids, globalSearch, pageable);
    }
    
    /**
     * TODO Auto-generated method documentation
     * 
     * @return Class
     */
    public Class<Timer> TimerServiceImpl.getEntityType() {
        return Timer.class;
    }
    
    /**
     * TODO Auto-generated method documentation
     * 
     * @return Class
     */
    public Class<Long> TimerServiceImpl.getIdType() {
        return Long.class;
    }
    
}
